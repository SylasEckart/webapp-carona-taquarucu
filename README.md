WebApp Carona Taquaruçu

<details>

```
@startuml
entity User {
    + user_id : int
    name : string
    email : string {sensitive}
    phone : string {sensitive}
    has_vehicle : boolean
    currentLocation : geography(Point) {sensitive}
}
entity Ride {
    + ride_id : int
    departure_time : datetime
    available_seats : int
    destination : geography(Point)
    distance : int
    status : string
    is_public : boolean
    needsHelp : HelpType
    startingLocation : geography(Point)
    maxTimeAccepting : interval
    acceptPets : boolean
    isSmoking : boolean
    plannedStops : int
    musicPreference : string
    luggageSpace : int
    rideAmenities : string
    specialAssistance : string
    observations : text
}
entity Request {
    + request_id : int
    departure_time : datetime
    status : string
    is_public : boolean
    needsHelp : HelpType
    startingLocation : geography(Point)
    maxTimeAccepting : interval
    acceptPets : boolean
    isSmoking : boolean
    plannedStops : int
    musicPreference : string
    luggageSpace : int
    rideAmenities : string
    specialAssistance : string
    observations : text
    requestType : RequestType
}
entity RideLog {
    + log_id : int
    + user_id : int
    + ride_id : int
    travel_distance : int
    help_type : HelpType
}
entity Friendship {
    + friendship_id : int
    user_id_1 : int
    user_id_2 : int
    status : string
    created_at : datetime
    confirmed_at : datetime
    last_ride : datetime
    rides_shared : int
    total_distance_traveled : int
    friendship_level : string
}
entity Vehicle {
    + vehicle_id : int
    model : string
    capacity : int
    color : string
    license_plate : string {sensitive, optional_sharing_with_friends}
    year : int
    fuel_type : string
    condition : string
    features : string
}
entity GroupChat {
    + chat_id : int
    + ride_id : int
    + messages : text
    + created_at : datetime
    + deleted_at : datetime
}
enum HelpType {
    company
    money
    gas
}
enum RequestType {
    in_transit
    scheduled
}
User "1" -- "0..*" Ride : "offers"
User "0..*" -- "0..*" Friendship : "friends with"
Ride "1" -- "0..*" Request : "receives requests"
Request "0..*" -- "1" User : "requested by"
Ride "0..1" -- "1" User : "created by (if has vehicle)"
User "1" -- "0..1" Vehicle : "has"
User "1" -- "0..*" RideLog : "logs"
Ride "1" -- "0..*" RideLog : "logged by"
Ride "1" -- "0..1" GroupChat : "has"

note right of Ride
  Somente Usuarios com veículos podem oferecer corridas,
  Chat é criado wuando a corrida está a 1 hora do horário de partida
  Chat é fechado e mensagens são deletadas 1 hora depois do horário de partida
end note
@enduml
```
</details>



