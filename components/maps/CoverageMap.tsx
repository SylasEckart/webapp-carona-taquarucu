// components/CoverageMap.tsx
import React, { useEffect, useState, useCallback } from "react";
import useMap from "@/hooks/useMap";

const CoverageMap: React.FC = () => {
  const initialCenter: [number, number] = [-10.313573823214446, -48.15836083561156];
  const fixedRadius = 100000; 
  const coverageKey = "coverage-circle";

  const { mapRef, showCoverage, hideOverlay, showOverlay } = useMap({
    center: initialCenter,
    zoom: 15,
  });

  const [isCircleVisible, setIsCircleVisible] = useState(true);

  // Wrap showCoverage in useCallback to stabilize its reference
  const initializeCoverageCircle = useCallback(() => {
    showCoverage(coverageKey, initialCenter, fixedRadius);
  }, [showCoverage, initialCenter, fixedRadius]);

  // Draw the coverage circle on mount
  useEffect(() => {
    initializeCoverageCircle();
  }, [initializeCoverageCircle]);

  // Toggle circle visibility
  const toggleCircleVisibility = () => {
    if (isCircleVisible) {
      hideOverlay(coverageKey); // Hide the circle
    } else {
      showOverlay(coverageKey); // Show the circle
    }
    setIsCircleVisible(!isCircleVisible);
  };

  return (
    <div>
      <div ref={mapRef} style={{ height: "400px", width: "100%" }} />
      <div style={{ marginTop: "10px" }}>
        {/* <p>Radius: {fixedRadius} meters</p> */}
        <button onClick={toggleCircleVisibility} style={{ marginTop: "10px" }}>
          {isCircleVisible ? "Esconder Área de Cobertura" : "Mostrar Área de Cobertura"}
        </button>
      </div>
    </div>
  );
};

export default CoverageMap;
