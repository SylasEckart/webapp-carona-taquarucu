
type LocationType = { lat: number; lng: number };

export interface LocationState {
  location?: LocationType;
  locationName?: string;
}

export enum LocationActionType {
    SET_LOCATION_NAME = "SET_LOCATION_NAME",
    SET_LOCATION = "SET_LOCATION"
}

export type LocationAction = 
{ type: LocationActionType.SET_LOCATION_NAME; payload: string } |
{ type: LocationActionType.SET_LOCATION; payload: LocationType };

export const locationReducer = (state: LocationState, action: LocationAction): LocationState => {
  switch (action.type) {
    case "SET_LOCATION_NAME":
      return {...state, locationName: action.payload };
    case "SET_LOCATION":
      return {...state, location: action.payload };
    default:
      return state;
  }
};