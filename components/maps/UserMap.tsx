/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useMap from "@/hooks/useMap";
import { User } from "@/types/Interfaces";
import { iconRetinaUrl, iconUrl, shadowUrl } from "@/types/constants";


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: iconUrl, 
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
});
interface UserMapProps {
  user?: User; 
  location: [number, number];
  destinationCoords?: [number, number];
}

const UserMap: React.FC<UserMapProps> = React.memo(({ user, location, destinationCoords }) => {
  // Proteção para renderização do lado do servidor
  if (typeof window === 'undefined' || !user) return null;

  const { mapRef, addMarker, setView } = useMap({
    center: location,
    zoom: 12,
  });

  useEffect(() => {
    addMarker(location, "Sua Localização");
  }, [location, addMarker]);

  useEffect(() => {
    if(destinationCoords){
      setView(destinationCoords, 8);
      addMarker(destinationCoords, "Seu Destino");
    }
  }, [destinationCoords, addMarker]);

  // const handleRequestRide = () => {
  //   if (!destinationCoords) {
  //     alert("Defina um destino primeiro!");
  //     return;
  //   }

  //   const newRequest: Request = {
  //     request_id: "new_request_id", // Gerar ID único conforme a necessidade
  //     departure_time: new Date().toISOString(),
  //     status: "pending",
  //     is_public: true,
  //     needsHelp: HelpType.Company,
  //     startingLocation: {
  //       type: "Point",
  //       coordinates: location,
  //     },
  //     maxTimeAccepting: "2023-12-31T23:59:59Z",
  //     acceptPets: false,
  //     isSmoking: false,
  //     plannedStops: 0,
  //     musicPreference: "any",
  //     luggageSpace: 1,
  //     rideAmenities: "None",
  //     specialAssistance: "None",
  //     observations: "Request generated from UserMap",
  //     requestType: RequestType.InTransit,
  //     user_id: user.user_id,
  //     ride_id: "",
  //   };

  //   onRequest(newRequest);
  //   alert("Corrida solicitada com sucesso!");
  // };

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />
});

export default UserMap;
