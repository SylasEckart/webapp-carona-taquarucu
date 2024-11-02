// hooks/useMap.ts

import { useEffect, useRef, useCallback } from 'react';
import L  from 'leaflet';

interface UseMapOptions {
  center?: [number, number];
  zoom?: number;
  tileLayerUrl?: string;
  tileLayerAttribution?: string;
}

const useMap = ({ center = [0, 0], zoom = 13, tileLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", tileLayerAttribution = '&copy; OpenStreetMap contributors' }: UseMapOptions) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const overlaysRef = useRef<{ [key: string]: L.Layer }>({});

  useEffect(() => {
    if (!mapRef.current) return;

    mapInstance.current = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer(tileLayerUrl, { attribution: tileLayerAttribution }).addTo(mapInstance.current);

    Object.keys(overlaysRef.current).forEach(key => {
      overlaysRef.current[key].addTo(mapInstance.current!);
    });

    return () => {
      mapInstance.current?.remove();
    };
  }, [center, zoom, tileLayerUrl, tileLayerAttribution]);

  const showCoverage = (key: string, point: [number, number], radius: number) => {
    if (!mapInstance.current) return;

    if (overlaysRef.current[key]) {
      overlaysRef.current[key].remove();
    }

    const circle = L.circle(point, { radius, color: "blue", fillColor: "blue", fillOpacity: 0.3 });
    circle.bindPopup(`Área de cobertura: ${radius} metros`);
    circle.addTo(mapInstance.current);
    overlaysRef.current[key] = circle;

    return circle;
  };

  const showOverlay = (key: string) => {
    if (overlaysRef.current[key] && mapInstance.current) {
      overlaysRef.current[key].addTo(mapInstance.current!);
    }
  };

  const hideOverlay = (key: string) => {
    if (overlaysRef.current[key]) {
      overlaysRef.current[key].remove();
    }
  };

  const toggleCoverageVisibility = useCallback((key: string) => {
    if (overlaysRef.current[key]) {
      if (mapInstance.current?.hasLayer(overlaysRef.current[key])) {
        overlaysRef.current[key].remove();
      } else {
        overlaysRef.current[key].addTo(mapInstance.current!);
      }
    }
  }, []);

  const addMarker = (point: [number, number], popupText?: string) => {
    if (!mapInstance.current) return;
    const marker = L.marker(point);
    if (popupText) marker.bindPopup(popupText);
    marker.addTo(mapInstance.current);
    return marker;
  };

  const setView = (point: [number, number], zoomLevel: number) => {
    if (!mapInstance.current) return;
    mapInstance.current.setView(point, zoomLevel);
  };

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
    toggleCoverageVisibility,
  };
};

export default useMap;
