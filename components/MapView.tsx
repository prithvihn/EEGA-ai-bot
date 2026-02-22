'use client';

import dynamic from 'next/dynamic';
import type { NearbyCenter } from '@/lib/mockData';
import type { Hospital } from '@/lib/api';

const MapInner = dynamic(
  () => import('./MapViewInner').then((mod) => mod.MapViewInner),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-surface">
        <span className="font-body text-sm text-white/50">Loading map...</span>
      </div>
    ),
  }
);

interface MapViewProps {
  center: [number, number];
  markers?: NearbyCenter[];
  userLocation?: [number, number];
  hospitals?: Hospital[];
}

export function MapView({ center, markers, userLocation, hospitals }: MapViewProps) {
  return (
    <MapInner
      center={center}
      markers={markers || []}
      userLocation={userLocation}
      hospitals={hospitals}
    />
  );
}
