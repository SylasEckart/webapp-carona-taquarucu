import { FriendshipAction } from "@/app/reducers/friendshipReducer";
import { ApiResponse, handleApiCall } from "@/lib/helpers";
import {
  addFriendship,
  confirmFriendship,
  removeFriendship,
} from "@/services/supabase/client/Friendship";
import { Friendship } from "@/types/Interfaces";
import React, { useState } from "react";

type FriendshipActionType = "Delete" | "Confirm";

const useFriendshipAction = (dispatch: React.Dispatch<FriendshipAction>) => {
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Sends a friendship request to the specified friend.
   * @param userId - The user initiating the friendship.
   * @param friendId - The target friend.
   * @returns ApiResponse with data or errorMessage.
   */
  const sendFriendship = async (
    userId: string,
    friendId: string
  ): Promise<ApiResponse> => {
    const { data, errorMessage } = await handleApiCall(
      addFriendship,
      setLoading,
      (data: Friendship) => dispatch({ type: "ADD_FRIENDSHIP", payload: data }),
      userId,
      friendId
    );
    return { data, errorMessage };
  };

  /**
   * Toggles friendship state by confirming or deleting a friendship.
   * @param friendshipId - The ID of the friendship to modify.
   * @param type - Action type: "Delete" or "Confirm".
   * @returns ApiResponse with data or errorMessage.
   */
  const toggleFriendship = async (
    friendshipId: string,
    type: FriendshipActionType
  ): Promise<ApiResponse> => {
    if (type === "Delete") {
      
      const { data, errorMessage } = await handleApiCall(
        removeFriendship,
        setLoading,
        ()=>{},
        friendshipId
      );
      dispatch({ type: "DELETE_FRIENDSHIP", payload: friendshipId });
      return { data, errorMessage };
    }

    const { data, errorMessage } = await handleApiCall(
      confirmFriendship,
      setLoading,
      (data: Friendship) => dispatch({ type: "UPDATE_FRIENDSHIP", payload: data }),
      friendshipId
    );
    return { data, errorMessage };
  };

  return { toggleFriendship, sendFriendship, loading };
};

export default useFriendshipAction;
