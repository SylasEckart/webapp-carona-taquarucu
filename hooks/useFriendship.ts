/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { supabaseClient } from "@/utils/supabase/client";
import { searchFriendships } from "@/services/supabase/client/Friendship";
import { FriendshipAction } from "@/app/reducers/friendshipReducer";
import { Friendship } from "@/types/Interfaces";

export const useFriendship = (userId: string, dispatch: React.Dispatch<FriendshipAction>) => {
  useEffect(() => {
    let subscription: any;

    const fetchFriendships = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const { data, errorMessage } = await searchFriendships(userId) as { data: Friendship[]; errorMessage: string };
        if (errorMessage) {
          dispatch({ type: "FETCH_ERROR", payload: errorMessage });
          return;
        }
        dispatch({ type: "FETCH_SUCCESS", payload: data || [] });
      } catch (error) {
        console.log("Failed to fetch friendships", error);
        dispatch({ type: "FETCH_ERROR", payload: "Failed to fetch friendships." });
      }
    };

    const subscribeToFriendships = () => {
      subscription = supabaseClient
        .channel("friendships")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "friendships",
          },
          (payload) => {
            console.log("Friendship event:", payload);
            switch (payload.eventType) {
              case "INSERT":
                if(payload.new?.user_id_1 === userId || payload.new?.user_id_2 === userId) dispatch({ type: "ADD_FRIENDSHIP", payload: payload.new as Friendship });
                break;
              case "UPDATE":
                if(payload.new?.user_id_1 === userId || payload.new?.user_id_2 === userId) dispatch({ type: "UPDATE_FRIENDSHIP", payload: payload.new as Friendship });
                break;
              case "DELETE":
                dispatch({ type: "DELETE_FRIENDSHIP", payload: payload.old?.friendship_id });
                break;
              default:
                break;
            }
          }
        )
        .subscribe();
    };

    fetchFriendships();
    subscribeToFriendships();

    return () => {
      if (subscription) {
        supabaseClient.removeChannel(subscription);
      }
    };
  }, [userId, dispatch]);
};