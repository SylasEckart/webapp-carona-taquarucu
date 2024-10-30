// components/RideshareMap.tsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const RideshareMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Add a marker for the driver
    const driverMarker = L.marker([51.505, -0.09]).addTo(map).bindPopup("Driver is here");
    markerRef.current = driverMarker;

    // Simulate real-time location update
    const updateLocation = () => {
      const newLatLng: L.LatLngTuple = [51.505 + Math.random() * 0.01, -0.09 + Math.random() * 0.01];
      markerRef.current?.setLatLng(newLatLng);
    };

    const intervalId = setInterval(updateLocation, 2000); // Update every 2 seconds

    return () => {
      clearInterval(intervalId);
      map.remove();
    };
  }, []);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
};

export default RideshareMap;
