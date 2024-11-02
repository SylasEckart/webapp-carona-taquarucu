// components/InteractiveMap.tsx

import React, { useEffect } from 'react';
import useMap from '@/hooks/useMap';

interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  width?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center = [51.505, -0.09],
  zoom = 13,
  height = "500px",
  width = "100%",
}) => {
  const { mapRef, addMarker, setView } = useMap({ center, zoom });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setView([latitude, longitude], zoom);
        addMarker([latitude, longitude], "You are here");
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }, [addMarker, setView, zoom]);

  return <div ref={mapRef} style={{ height, width }} />;
};

export default InteractiveMap;
