/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LoginMap.tsx
import { useCallback, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useMap from "@/hooks/useMap";


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
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
  zoom = 14,
  markerPosition,
  markerPopupText = "Você está aqui",
  height = "250px",
  width = "100%",
}) => {

  const fixedRadius = 100000
  const coverageKey = "coverage-circle"; 

  const { mapRef, showCoverage, hideOverlay, showOverlay,addMarker } = useMap({
    center: center,
    zoom: zoom
  });

  console.log(hideOverlay, showOverlay)

  // const [isCircleVisible, setIsCircleVisible] = useState(true);

  const initializeCoverageCircle = useCallback(() => {
    showCoverage(coverageKey, center, fixedRadius);
  }, [showCoverage, center, fixedRadius]);

  useEffect(() => {
    initializeCoverageCircle();
  }, [initializeCoverageCircle]);

  useEffect(() => {
    if (markerPosition) {
      addMarker(markerPosition, markerPopupText);
    }
  }, [markerPosition, addMarker, markerPopupText]);

  // const toggleCircleVisibility = () => {
  //   if (isCircleVisible) {
  //     hideOverlay(coverageKey); 
  //   } else {
  //     showOverlay(coverageKey); 
  //   }
  //   setIsCircleVisible(!isCircleVisible);
  // };

  return <div>
      <div ref={mapRef}  style={{ height, width }} />;
      <div style={{ marginTop: "10px" }}>
        {/* <p>Radius: {fixedRadius} meters</p> */}
        {/* <button onClick={toggleCircleVisibility} style={{ marginTop: "10px" }}>
          {isCircleVisible ? "Esconder Área de Cobertura" : "Mostrar Área de Cobertura"}
        </button> */}
      </div>
    </div>
};

export default LoginMap;
