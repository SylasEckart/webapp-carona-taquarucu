// components/LoginMap.tsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LoginMapProps {
  center?: [number, number];
  zoom?: number;
  markerPosition?: [number, number];
  markerPopupText?: string;
  height?: string;
  width?: string;
}

const LoginMap: React.FC<LoginMapProps> = ({
  center = [-10.313573823214446, -48.15836083561156],
  zoom = 15,
  markerPosition = [-10.313573823214446, -48.15836083561156],
  markerPopupText = "Você está aqui",
  height = "250px",
  width = "100%",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the Leaflet map
    const map = L.map(mapRef.current).setView(center, zoom);

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker
    const marker = L.marker(markerPosition).addTo(map);
    marker.bindPopup(markerPopupText).openPopup();

    return () => {
      map.remove(); // Clean up on unmount
    };
  }, []);

  return <div ref={mapRef}  style={{ height, width }} />;
};

export default LoginMap;
