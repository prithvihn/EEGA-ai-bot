'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { NearbyCenter } from '@/lib/mockData';
import type { Hospital } from '@/lib/api';
import 'leaflet/dist/leaflet.css';

// Default blue marker icon (for hospitals & nearby centers)
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Red marker for user location
const userIcon = L.divIcon({
  className: '',
  html: `<div style="
    width: 18px; height: 18px;
    background: #ef4444;
    border: 3px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(239,68,68,0.7);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -12],
});

interface MapViewInnerProps {
  center: [number, number];
  markers: NearbyCenter[];
  userLocation?: [number, number];
  hospitals?: Hospital[];
}

export function MapViewInner({ center, markers, userLocation, hospitals }: MapViewInnerProps) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      className="w-full h-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location — red dot */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">📍 Your Location</p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Mock nearby centers (scenario cards flow) */}
      {markers.map((place) => (
        <Marker
          key={place.name}
          position={[place.lat, place.lng]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{place.name}</p>
              <p className="text-gray-600">{place.type}</p>
              <p className="text-gray-500">{place.distance} • {place.eta}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Real hospitals from Overpass API */}
      {hospitals?.map((h) => (
        <Marker
          key={`${h.name}-${h.lat}-${h.lon}`}
          position={[h.lat, h.lon]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{h.name}</p>
              <p className="text-gray-500">{h.distance_km} km away</p>
              {h.phone && (
                <p className="text-blue-600">
                  📞 <a href={`tel:${h.phone}`}>{h.phone}</a>
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
