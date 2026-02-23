from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os
import math
import httpx

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://eega-ai.vercel.app/"  # ← add your Vercel URL here
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://models.inference.ai.azure.com"
)

class EmergencyRequest(BaseModel):
    message: str
    emergency_type: str = ""

SYSTEM_PROMPT = """You are EEGA (Extreme Emergency Guidance Assistant), an AI first-aid and emergency response assistant.
When someone describes an emergency:
1. Immediately give step-by-step first aid instructions (numbered, clear, simple)
2. Mention when to call emergency services (100=Police, 101=Fire, 108=Ambulance in India)
3. Keep instructions concise and actionable — people are panicking
4. Always end with the relevant emergency number to call
Be calm, direct, and life-saving focused."""

@app.post("/analyze")
async def analyze_emergency(request: EmergencyRequest):
    try:
        user_message = request.message
        if request.emergency_type:
            user_message = f"Emergency type: {request.emergency_type}. Details: {request.message}"

        response = client.chat.completions.create(
            model="gpt-4o-mini",  # switched from gpt-4o — higher rate limits
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            max_tokens=600,
            temperature=0.3,
        )

        return {
            "guidance": response.choices[0].message.content,
            "emergency_type": request.emergency_type or "General Emergency"
        }

    except Exception as e:
        print(f"❌ ERROR: {str(e)}")  # check backend terminal for this
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "EEGA backend running"}


# ── Nearby Hospitals (Overpass API — no key required) ────────────────────

class HospitalRequest(BaseModel):
    latitude: float
    longitude: float


def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Return distance in km between two lat/lon points."""
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


OVERPASS_URL = "https://overpass-api.de/api/interpreter"


@app.post("/nearby-hospitals")
async def nearby_hospitals(req: HospitalRequest):
    query = f"""
    [out:json][timeout:10];
    (
      node["amenity"="hospital"](around:5000,{req.latitude},{req.longitude});
      way["amenity"="hospital"](around:5000,{req.latitude},{req.longitude});
      relation["amenity"="hospital"](around:5000,{req.latitude},{req.longitude});
    );
    out center tags;
    """
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(OVERPASS_URL, data={"data": query})
            resp.raise_for_status()
            data = resp.json()

        hospitals = []
        for el in data.get("elements", []):
            # For ways/relations the coords live under .center
            lat = el.get("lat") or el.get("center", {}).get("lat")
            lon = el.get("lon") or el.get("center", {}).get("lon")
            tags = el.get("tags", {})
            name = tags.get("name")
            if not name or lat is None or lon is None:
                continue

            dist = haversine(req.latitude, req.longitude, lat, lon)
            hospitals.append({
                "name": name,
                "lat": lat,
                "lon": lon,
                "distance_km": round(dist, 2),
                "phone": tags.get("phone") or tags.get("contact:phone") or None,
            })

        hospitals.sort(key=lambda h: h["distance_km"])
        return hospitals[:15]  # cap at 15 results

    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail=f"Overpass API error: {e.response.status_code}")
    except Exception as e:
        print(f"❌ Hospital lookup error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
