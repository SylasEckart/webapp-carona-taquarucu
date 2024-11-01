import { useCallback, useState, useEffect } from "react";
// import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useMap from "@/hooks/useMap";
import { User, Request, HelpType, RequestType } from "@/types/Interfaces";

interface UserMapProps {
  user?: User; 
  onRequest: (request: Request) => void; 
  location: [number, number];
}

const UserMap: React.FC<UserMapProps> = ({ user, onRequest, location }) => {
  // Proteção para renderização do lado do servidor
  if (typeof window === 'undefined' || !user) return null;

  const [destination, setDestination] = useState<string>("");
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);

  const { mapRef, addMarker, setView } = useMap({
    center: location,
    zoom: 13,
  });

  // Função para buscar coordenadas do endereço (executada apenas no lado do cliente)
  const handleSearchLocation = useCallback(async () => {
    if (!destination) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json`);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setDestinationCoords(coords);
        setView(coords, 13);
        addMarker(coords, "Destino");
      } else {
        alert("Endereço não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  }, [destination, addMarker, setView]);

  // Função para solicitar uma corrida com o local atual e destino
  const handleRequestRide = () => {
    if (!destinationCoords) {
      alert("Defina um destino primeiro!");
      return;
    }

    const newRequest: Request = {
      request_id: "new_request_id", // Gerar ID único conforme a necessidade
      departure_time: new Date().toISOString(),
      status: "pending",
      is_public: true,
      needsHelp: HelpType.Company,
      startingLocation: {
        type: "Point",
        coordinates: location,
      },
      maxTimeAccepting: "2023-12-31T23:59:59Z",
      acceptPets: false,
      isSmoking: false,
      plannedStops: 0,
      musicPreference: "any",
      luggageSpace: 1,
      rideAmenities: "None",
      specialAssistance: "None",
      observations: "Request generated from UserMap",
      requestType: RequestType.InTransit,
      user_id: user.user_id,
      ride_id: "",
    };

    onRequest(newRequest);
    alert("Corrida solicitada com sucesso!");
  };

  // Verificação de cliente antes de inicializar o mapa
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Lógica que depende do DOM ou do `window` aqui, se necessário
    }
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ height: "400px", width: "100%" }} />

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Digite o destino"
          style={{ width: "70%", marginRight: "5px" }}
        />
        <button onClick={handleSearchLocation} style={{ marginRight: "5px" }}>
          Buscar Destino
        </button>
        <button onClick={handleRequestRide} disabled={!destinationCoords}>
          Solicitar Corrida
        </button>
      </div>
    </div>
  );
};

export default UserMap;
