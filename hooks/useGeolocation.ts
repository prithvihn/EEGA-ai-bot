'use client';

import { useEffect } from 'react';
import { useEmergencyStore } from '@/store/emergencyStore';

export function useGeolocation() {
  const setLocation = useEmergencyStore((state) => state.setLocation);

  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const handleError = () => {
      // Fallback to Hyderabad, India if permission denied or unavailable
      setLocation({ lat: 17.385, lng: 78.4867 });
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, [setLocation]);
}
