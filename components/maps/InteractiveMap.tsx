/* eslint-disable @typescript-eslint/no-explicit-any */
// components/InteractiveMap.tsx
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface InteractiveMapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  markerPopupText?: string;
  height?: string;
  width?: string;
}

// Fix for Leaflet marker icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  initialCenter = [-10.313573823214446, -48.15836083561156],
  initialZoom = 15,
  markerPopupText = "Você está aqui",
  height = "250px",
  width = "100%",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerInstance = useRef<L.Marker | null>(null);
  
  // State to track the marker's position
  const [markerPosition, setMarkerPosition] = useState<[number, number]>(initialCenter);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    mapInstance.current = L.map(mapRef.current).setView(initialCenter, initialZoom);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance.current);

    // Add initial marker
    markerInstance.current = L.marker(markerPosition).addTo(mapInstance.current);
    markerInstance.current.bindPopup(markerPopupText).openPopup();

    // Handle map click to update marker position
    mapInstance.current.on("click", (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      setMarkerPosition([lat, lng]);
    });

    return () => {
      mapInstance.current?.remove(); // Clean up on unmount
    };
  }, []);

  // Update marker position when state changes
  useEffect(() => {
    if (markerInstance.current) {
      markerInstance.current.setLatLng(markerPosition).openPopup();
    }
  }, [markerPosition]);

  return <div ref={mapRef} style={{ height, width }} />;
};

export default InteractiveMap;
