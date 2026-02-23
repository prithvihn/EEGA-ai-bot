<div align="center">

```
███████╗███████╗ ██████╗  █████╗
██╔════╝██╔════╝██╔════╝ ██╔══██╗
█████╗  █████╗  ██║  ███╗███████║
██╔══╝  ██╔══╝  ██║   ██║██╔══██║
███████╗███████╗╚██████╔╝██║  ██║
╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
```

### ⚡ Extreme Emergency Guidance Assistant

**When Seconds Matter, EEGA Responds**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-eega--ai.vercel.app-FF3B3B?style=for-the-badge)](https://eega-ai.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai)](https://openai.com)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Frontend-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Deployed on Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render)](https://render.com)

</div>

---

## 🆘 What is EEGA?

EEGA (Extreme Emergency Guidance Assistant) is an **AI-powered emergency response web application** that provides real-time, step-by-step first aid guidance when every second counts. Whether it's a snake bite, cardiac arrest, fire, or drowning — EEGA analyzes the situation using AI and delivers clear, actionable instructions instantly.

> **Built to save lives with AI.**

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    USER BROWSER                      │
│                                                      │
│   ┌──────────────┐      ┌───────────────────────┐   │
│   │  Next.js 15  │      │   Leaflet + OSM Maps  │   │
│   │  (Frontend)  │      │  (Nearby Hospitals)   │   │
│   └──────┬───────┘      └───────────────────────┘   │
│          │ REST API                                   │
└──────────┼──────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────┐
│   FastAPI Backend        │
│   (Render.com)           │
│                          │
│   POST /analyze          │
│   POST /nearby-hospitals │
│   GET  /health           │
└──────────┬───────────────┘
           │
           ▼
┌─────────────────────────┐      ┌──────────────────────┐
│   OpenAI GPT-4o-mini    │      │  Overpass API (OSM)  │
│   (via GitHub Models)   │      │  Nearby Hospitals    │
└─────────────────────────┘      └──────────────────────┘
```

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 15 + TypeScript | Core web application |
| **Styling** | Tailwind CSS | Dark theme UI |
| **State Management** | Zustand | Global emergency state |
| **3D Animation** | Three.js | Hero radar animation |
| **Backend** | FastAPI + Python | API server |
| **AI Engine** | OpenAI GPT-4o-mini | Emergency guidance |
| **Maps** | Leaflet + OpenStreetMap | Free, no API key needed |
| **Hospitals Data** | Overpass API | Free nearby hospital search |
| **Speech Input** | Web Speech API | Voice emergency input |
| **Frontend Deploy** | Vercel | Auto-deploy on push |
| **Backend Deploy** | Render | Python hosting |

---

## ✨ Core Features

```
🎙️  SPEAK YOUR EMERGENCY    →  Voice input via Web Speech API
⌨️  TYPE YOUR EMERGENCY     →  Free-text AI analysis
🃏  SCENARIO CARDS          →  12 predefined emergency types
🤖  AI GUIDANCE             →  Step-by-step first aid from GPT-4o-mini
📍  LIVE LOCATION           →  GPS coordinates auto-detected
🏥  NEARBY HOSPITALS        →  Real hospitals near you via OpenStreetMap
🗺️  INTERACTIVE MAP         →  Visual hospital markers with Leaflet
📞  EMERGENCY NUMBERS       →  100 (Police) | 101 (Fire) | 108 (Ambulance)
```

### Supported Emergency Scenarios
`🔥 Fire/Explosion` `🐍 Snake Bite` `🫀 Cardiac Arrest` `🚗 Road Accident`
`🌊 Flooding` `⚡ Electric Shock` `🏊 Drowning` `🤕 Head Injury`
`🩸 Stabbing/Bleeding` `☠️ Poisoning` `🌍 Earthquake` `😮 Choking`

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](./assets/landing-page.png)

### 🤖 AI Guidance — Snake Bite-Input-Output
![Snake Bite AI Response](./assets/snake-bite-ai.png)

### 🏥 Nearby Hospitals
![Nearby Hospitals](./assets/near-by-hospitals.png)

### 🐍 Emergency Example
![Snake Bite Example](./assets/snake-bite-ex.png)

### ⚡ Electric Shock Example
![Electric Shock](./assets/electric-shock-ex.png)

### 📋 Scenario Grid
![Scenario Grid](./assets/scenario-grid.png)

### ℹ️ How It Works
<div align="center">

| Step | Action |
|------|--------|
| **01** | User opens EEGA → Browser requests location permission → Live GPS coordinates captured |
| **02** | User types or speaks the emergency — e.g. *"fire in building"*, *"snake bite"*, *"heart attack"* |
| **03** | FastAPI backend receives input → AI classifies the emergency type and severity |
| **04** | Emergency type detected → Relevant first-aid protocol retrieved and structured |
| **05** | Overpass API called with coordinates → Nearest hospitals and help centers located |
| **06** | Shortest route to nearest help center calculated |
| **07** | Structured response assembled → Emergency type + Immediate steps + Nearby centers + Numbers |
| **08** | Response sent to frontend → Map renders with markers + Guidance displayed in UI |
| **09** | *(Optional)* SMS auto-sent to emergency contacts with location and emergency type |

</div>


---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/prithvihn/EEGA-ai-bot.git
cd EEGA-ai-bot
```

### 2. Frontend Setup
```bash
npm install
```

### 3. Backend Setup
```bash
cd backend

# Create and activate virtual environment
python -m venv env

# Windows
env\Scripts\activate

# Mac/Linux
source env/bin/activate

pip install -r requirements.txt
```

### 4. Environment Variables

Create `.env.local` in the **root** directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create `.env` inside the **backend** directory:
```env
OPENAI_API_KEY=your_openai_or_github_models_token
```

### 5. Run the Application

**Terminal 1 — Backend:**
```bash
cd backend
env\Scripts\activate   # Windows
uvicorn main:app --reload --port 8000
```

**Terminal 2 — Frontend:**
```bash
npm run dev
```

Open **http://localhost:3000** 🎉

---

## 🔐 Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | `.env.local` (root) | FastAPI backend URL |
| `OPENAI_API_KEY` | `backend/.env` | OpenAI or GitHub Models API key |

> ⚠️ **Never commit `.env` files to GitHub.** They are already in `.gitignore`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/analyze` | Analyze emergency and return AI guidance |
| `POST` | `/nearby-hospitals` | Find hospitals near given coordinates |
| `GET` | `/health` | Health check — confirms backend is running |

### POST `/analyze`
```json
// Request
{
  "message": "A snake bit my friend on the leg",
  "emergency_type": "Snake Bite"
}

// Response
{
  "guidance": "1. Stay Calm...\n2. Immobilize the limb...",
  "emergency_type": "Snake Bite"
}
```

### POST `/nearby-hospitals`
```json
// Request
{ "latitude": 12.9716, "longitude": 77.5946 }

// Response
[
  {
    "name": "Victoria Hospital",
    "distance_km": 1.2,
    "lat": 12.9652,
    "lon": 77.5822,
    "phone": "+91-80-2670-1150"
  }
]
```

---

## 🌐 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | [eega-ai.vercel.app](https://eega-ai.vercel.app) |
| Backend | Render (Free Tier) | [eega-backend](https://eega-frontend.onrender.com) |

> ⏳ **Note on Backend Performance:** The backend is hosted on Render's free tier which **spins down after inactivity**. Your first request after a period of inactivity may take **40–50 seconds** to respond while the server wakes up. Subsequent requests will be fast. Please be patient on first load!

---

## 🔮 Future Improvements

- [ ] 🔴 **Live ambulance tracking** — Real-time GPS tracking of nearest ambulance
- [ ] 📱 **Progressive Web App (PWA)** — Install on phone like a native app  
- [ ] 🌐 **Multi-language support** — Hindi, Tamil, Telugu and other regional languages
- [ ] 📲 **SMS alerts** — Auto-notify emergency contacts via SMS
- [ ] 🏥 **Hospital integration** — Direct call button to nearest hospital
- [ ] 🎥 **Video guidance** — Visual step-by-step emergency video instructions
- [ ] 🔔 **Offline mode** — Core first-aid guidance available without internet
- [ ] 📊 **Analytics dashboard** — Track emergency types and response patterns

---

## ⚠️ Disclaimer

EEGA is an AI-powered **guidance tool** and is **not a substitute for professional medical help.**

> Always call official emergency services in life-threatening situations:
> - 🚑 **108** — Ambulance
> - 🚒 **101** — Fire
> - 👮 **100** — Police
> - 🏥 **112** — National Emergency Number



<div align="center">

**Built with ❤️ to save lives using AI**

⭐ Star this repo if you find it useful!

[![GitHub](https://img.shields.io/badge/GitHub-prithvihn-181717?style=for-the-badge&logo=github)](https://github.com/prithvihn)

</div>
