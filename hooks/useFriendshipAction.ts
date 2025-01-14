import { FriendshipAction, FriendshipActionType } from "@/app/reducers/friendshipReducer";
import { ApiResponse} from "@/lib/helpers";
import {
  addFriendship,
  confirmFriendship,
  removeFriendship,
  searchFriendships,
} from "@/services/supabase/client/Friendship";
import React, { useEffect } from "react";


const useFriendshipAction = (dispatch: React.Dispatch<FriendshipAction>,userId?:string) => {
  const {
    ADD_FRIENDSHIP,
    DELETE_FRIENDSHIP,
    UPDATE_FRIENDSHIP,
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_ERROR,
  } = FriendshipActionType;


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

    try {
      const { data,errorMessage } = await addFriendship(userId as string,friendId);
      if (errorMessage) {
        dispatch({ type: FETCH_ERROR, payload: errorMessage });
        return { errorMessage };
      }
      dispatch({ type: ADD_FRIENDSHIP, payload: data });
      return { errorMessage };
    } catch (error) {
      console.error("Failed to add:", error);
      dispatch({ type: FETCH_ERROR, payload: "Failed to add friendships." });
      return { errorMessage: "Failed to add friendship." };
    }
  };

  /**
   * Toggles friendship state by confirming or deleting a friendship.
   * @param friendshipId - The ID of the friendship to modify.
   * @param type - Action type: "Delete" or "Confirm".
   * @returns ApiResponse with data or errorMessage.
   */
  const toggleFriendship = async (
    friendshipId: string,
    type: "Delete" | "Confirm",
    userId?: string
  ): Promise<ApiResponse> => {

    if (type === "Delete") {
        try {
          const { errorMessage } = await removeFriendship(friendshipId);
          if (errorMessage) {
            dispatch({ type: FETCH_ERROR, payload: errorMessage });
            return { errorMessage };
          }
          dispatch({ type: DELETE_FRIENDSHIP, payload: friendshipId });
          return { errorMessage };
        } catch (error) {
          console.error("Failed to delete:", error);
          dispatch({ type: FETCH_ERROR, payload: "Failed to fetch friendships." });
          return { errorMessage: "Failed to delete friendship." };
        }
    }

    try {
      const { data,errorMessage } = await confirmFriendship(friendshipId,userId as string);
      if (errorMessage) {
        dispatch({ type: FETCH_ERROR, payload: errorMessage });
        return { errorMessage };
      }
      dispatch({ type: UPDATE_FRIENDSHIP, payload: data });
      return { errorMessage };
    } catch (error) {
      console.error("Failed to delete:", error);
      dispatch({ type: FETCH_ERROR, payload: "Failed to fetch friendships." });
      return { errorMessage: "Failed to delete friendship." };
    }
  
  };
  
  useEffect(() => {
      if (!userId) {
        return;
      }
  
      const fetchFriendships = async () => {
        dispatch({ type: FETCH_START });
        try {
          const { data, errorMessage } = await searchFriendships(userId);
          if (errorMessage) {
            dispatch({ type: FETCH_ERROR, payload: errorMessage });
            return;
          }
          dispatch({ type: FETCH_SUCCESS, payload: data || [] });
        } catch (error) {
          console.error("Failed to fetch friendships:", error);
          dispatch({ type: FETCH_ERROR, payload: "Failed to fetch friendships." });
        }
      };
  
      fetchFriendships();
  
    }, [userId, dispatch]);
  

  return { toggleFriendship, sendFriendship };
};

export default useFriendshipAction;
