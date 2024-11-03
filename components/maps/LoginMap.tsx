/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LoginMap.tsx
import React, { useCallback, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useMap from "@/hooks/useMap";
import { iconRetinaUrl, iconUrl, shadowUrl, taquarucuSquarelocation } from "@/types/constants";


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: iconUrl, 
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
});

interface LoginMapProps {
  center?: [number, number];
  zoom?: number;
  markerPosition?: [number, number];
  markerPopupText?: string;
  height?: string;
  width?: string;

}

const LoginMap: React.FC<LoginMapProps> = React.memo(({
  center = taquarucuSquarelocation,
  zoom = 15,
  markerPosition,
  markerPopupText = "Você está aqui",
  height = "250px",
  width = "100%",
}) => {

  const fixedRadius = 100000;
  const coverageKey = "coverage-circle"; 

  const { mapRef, showCoverage, addMarker } = useMap({
    center: center as [number, number],
    zoom: zoom
  });

  // const [isCircleVisible, setIsCircleVisible] = useState(true);

  const initializeCoverageCircle = useCallback(() => {
    showCoverage(coverageKey, taquarucuSquarelocation, fixedRadius);
  }, []);

  useEffect(() => {
    initializeCoverageCircle();
  }, []);

  useEffect(() => {
    if (markerPosition) {
      addMarker(markerPosition, markerPopupText);
    }
  }, [markerPosition, addMarker, markerPopupText]);

  
  return <div ref={mapRef}  style={{ height, width }} />
});

export default LoginMap;
