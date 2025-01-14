import React, { createContext, useReducer, useContext, useMemo, ReactNode } from "react";
import { Friendship } from "@/types/Interfaces";
import { FriendshipAction, friendshipReducer,initialFriendshipState } from "../reducers/friendshipReducer";

import useFriendshipAction from "@/hooks/useFriendshipAction";
interface FriendshipContextProps {
  friendships: Friendship[];
  isLoading: boolean;
  error: string | null;
  dispatch: React.Dispatch<FriendshipAction>;
}

const FriendshipContext = createContext<FriendshipContextProps | undefined>(undefined);

export const FriendshipProvider: React.FC<{ children: ReactNode; userId: string }> = ({ children, userId }) => {
  const [state, dispatch] = useReducer(friendshipReducer, initialFriendshipState);
  
  useFriendshipAction(dispatch,userId);

  const contextValue = useMemo(
    () => ({
      friendships: state.friendships,
      isLoading: state.loading,
      error: state.error,
      dispatch,
    }),
    [state]
  );

  return <FriendshipContext.Provider value={contextValue}>{children}</FriendshipContext.Provider>;
};

export const useFriendshipContext = () => {
  const context = useContext(FriendshipContext);
  if (!context) {
    throw new Error("useFriendshipContext must be used within a FriendshipProvider");
  }
  return context;
};
