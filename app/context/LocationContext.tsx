import { LocationAction, locationReducer, LocationState } from "../reducers/locationReducer";
import { createContextFactory } from "./ContextFactory";

const { Provider: LocationProvider, useContext: useLocationContext } = createContextFactory<LocationState, LocationAction>({
  reducer: locationReducer,
  initialState: { location: undefined },
  displayName: "LocationContext",
});

export { LocationProvider, useLocationContext };