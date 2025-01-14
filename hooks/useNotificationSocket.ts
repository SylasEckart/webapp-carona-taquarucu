import { useEffect } from "react";
import { supabaseClient } from "@/utils/supabase/client";

import { getNotifications } from "@/services/supabase/client/Notifications";
import { HeaderNotification, NotificationAction, NotificationActionType } from "@/app/reducers/notificationsReducer";

const {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,

} = NotificationActionType

export const useNotificationSocket = (userId: string, dispatch:React.Dispatch<NotificationAction>) => {
  useEffect(() => {
    let subscription: ReturnType<typeof supabaseClient['channel']>;

    const fetchNotifications = async () => {
      dispatch({ type: FETCH_START });
      try {
        const { data, errorMessage } = await getNotifications(userId)
        if (errorMessage) {
          dispatch({ type: FETCH_ERROR , payload: errorMessage });
          return;
        }
        dispatch({ type: FETCH_SUCCESS, payload: data as unknown as HeaderNotification[] || [] });
      } catch (error) {
        console.log("Failed to fetch notifications", error);
        dispatch({ type: FETCH_ERROR, payload: "Failed to fetch notifications." });
      }
    };

    const subscribeToNotifications = () => {
      console.log("subscribing to notifications event", "user_id = ", userId);
      subscription = supabaseClient
        .channel("notifications")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            console.log("event:", payload);
          }
        )
        .subscribe();
    };

    fetchNotifications();
    subscribeToNotifications();

    return () => {
      if (subscription) {
        supabaseClient.removeChannel(subscription);
      }
    };
  }, [userId, dispatch]);
};