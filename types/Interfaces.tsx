
export enum HelpType {
    Company = 'company',
    Money = 'money',
    Gas = 'gas'
  }

export enum ModalContentType {
    addVehicle = 'addVehicle',
    addRide = 'addRide',
    addFriend = 'addFriend'
  }
  
export enum RequestType {
    InTransit = 'in_transit',
    Scheduled = 'scheduled'
  }

export enum Status {
  Info = "info",
  Warning = "warning",
  Error = "error",
  Success = "success"
}
  
  // User Interface
export interface User {
    isPending?: boolean;
    isFriend?: boolean;
    user_id: string;
    name: string;
    email: string;
    phone: string;
    has_vehicle: boolean;
    currentlocation: {
      type: 'Point';
      coordinates: [number, number];
    };
    friendships: string[] // userIds: string;
    notifications: string[] // notificationIds: string;
  }
  
  // Vehicle Interface
export interface Vehicle {
    vehicle_id: string;
    model: string;
    capacity: number;
    color: string;
    license_plate: string;
    year: number;
    fuel_type: string;
    condition: string;
    features: string;
    user_id: string;
  }
  
  // Ride Interface
export interface Ride {
    ride_id: string;
    departure_time: string; // ISO string format for datetime
    available_seats: number;
    destination: {
      type: 'Point';
      coordinates: [number, number];
    };
    distance: number;
    status: string;
    is_public: boolean;
    needsHelp: HelpType;
    startingLocation: {
      type: 'Point';
      coordinates: [number, number];
    };
    maxTimeAccepting: string; // ISO string format for interval
    acceptPets: boolean;
    isSmoking: boolean;
    plannedStops: number;
    musicPreference: string;
    luggageSpace: number;
    rideAmenities: string;
    specialAssistance: string;
    observations: string;
    user_id: string;
  }
  
  // Request Interface
export interface Request {
    request_id: string;
    departure_time: string; // ISO string format for datetime
    status: string;
    is_public: boolean;
    needsHelp: HelpType;
    startingLocation: {
      type: 'Point';
      coordinates: [number, number];
    };
    maxTimeAccepting: string; // ISO string format for interval
    acceptPets: boolean;
    isSmoking: boolean;
    plannedStops: number;
    musicPreference: string;
    luggageSpace: number;
    rideAmenities: string;
    specialAssistance: string;
    observations: string;
    requestType: RequestType;
    user_id: string;
    ride_id: string;
  }
  
  // Friendship Interface
export interface Friendship {
    sender: string;
    friendship_id: string;
    users: [string, string];
    user_id_1:string;
    user_id_2:string;
    status: string;
    created_at: string; // ISO string format for datetime
    confirmed_at: string | null; // ISO string format for datetime
    last_ride: string | null; // ISO string format for datetime
    rides_shared: number;
    total_distance_traveled: number;
    friendship_level: string;
  }
  
  // Group Chat Interface
export interface GroupChat {
    chat_id: string;
    ride_id: string;
    messages: string;
    created_at: string; // ISO string format for datetime
    deleted_at: string; // ISO string format for datetime
  }
  
  // Ride Log Interface
export interface RideLog {
    log_id: string;
    user_id: string;
    ride_id: string;
    travel_distance: number;
    help_type: HelpType;
  }
  