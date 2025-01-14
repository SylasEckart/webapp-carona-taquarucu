import React, { createContext, useReducer, useContext, ReactNode } from "react";

interface ContextFactoryOptions<State, Action> {
  reducer: (state: State, action: Action) => State; 
  initialState: State;
  displayName?: string;
}

export const createContextFactory = <State, Action>(
  options: ContextFactoryOptions<State, Action>
) => {
  const { reducer, initialState, displayName } = options;

  const Context = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
  } | null>(null);

  if (displayName) {
    Context.displayName = displayName;
  }

  const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    );
  };

  const useContextHook = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(
        `${displayName || "UnnamedContext"} must be used within a Provider`
      );
    }
    return context;
  };

  return { Provider, useContext: useContextHook };
};
