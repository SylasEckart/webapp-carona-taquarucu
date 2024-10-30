// hooks/useMap.ts
import { useEffect, useRef } from "react";
import L from "leaflet";

interface UseMapOptions {
  center?: [number, number];
  zoom?: number;
  tileLayerUrl?: string;
  tileLayerAttribution?: string;
}

const useMap = ({ center = [0, 0], zoom = 13, tileLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", tileLayerAttribution = '&copy; OpenStreetMap contributors' }: UseMapOptions) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const overlaysRef = useRef<{ [key: string]: L.Layer }>({}); // Store overlays by key

  useEffect(() => {
    if (!mapRef.current) return;

    mapInstance.current = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer(tileLayerUrl, { attribution: tileLayerAttribution }).addTo(mapInstance.current);

    return () => {
      mapInstance.current?.remove(); // Cleanup on unmount
    };
  }, [center, zoom, tileLayerUrl, tileLayerAttribution]);

  // Create and show a coverage circle
  const showCoverage = (key: string, point: [number, number], radius: number) => {
    if (!mapInstance.current) return;
    
    // Remove existing circle with the same key, if any
    if (overlaysRef.current[key]) {
      overlaysRef.current[key].remove();
    }

    // Create a new circle and add to map
    const circle = L.circle(point, { radius, color: "blue", fillColor: "blue", fillOpacity: 0.3 });
    circle.addTo(mapInstance.current);
    overlaysRef.current[key] = circle; // Store in overlays by key

    return circle;
  };

  // Show overlay by key
  const showOverlay = (key: string) => {
    if (overlaysRef.current[key] && mapInstance.current) {
      overlaysRef.current[key].addTo(mapInstance.current);
    }
  };

  // Hide overlay by key
  const hideOverlay = (key: string) => {
    if (overlaysRef.current[key]) {
      overlaysRef.current[key].remove();
    }
  };

  // Hook for adding a marker
  const addMarker = (point: [number, number], popupText?: string) => {
    if (!mapInstance.current) return;
    const marker = L.marker(point);
    if (popupText) marker.bindPopup(popupText);
    marker.addTo(mapInstance.current);
    return marker;
  };

  // Hook to set the view of the map
  const setView = (point: [number, number], zoomLevel: number) => {
    if (!mapInstance.current) return;
    mapInstance.current.setView(point, zoomLevel);
  };

  // Hook to clear all overlays
  const clearOverlays = () => {
    if (!mapInstance.current) return;
    Object.values(overlaysRef.current).forEach((overlay) => overlay.remove());
    overlaysRef.current = {};
  };

  return {
    mapRef,
    showCoverage,
    addMarker,
    setView,
    clearOverlays,
    showOverlay,
    hideOverlay,
  };
};

export default useMap;
