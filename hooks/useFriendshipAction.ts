import { ApiResponse, handleApiCall } from "@/lib/helpers";
import { addFriendship, confirmFriendship, removeFriendship } from "@/services/supabase/client/Friendship";
import { useState } from "react";

const useFriendshipAction = () => {
  const [loading, setLoading] = useState<boolean>(false);


  const sendFriendship = async (userId: string, friendId: string): Promise<ApiResponse> => {
    const { data, errorMessage } = await handleApiCall(addFriendship,setLoading, userId, friendId);
    return { data, errorMessage };
  };

  const toggleFriendship = async (
    friendshipId: string,
    type: "Delete" | "Confirm"
  ): Promise<ApiResponse> => {
    if (type === "Delete") {
      const { data, errorMessage } = await handleApiCall(removeFriendship,setLoading, friendshipId);
      return { data, errorMessage };
    }
    const { data, errorMessage } = await handleApiCall(confirmFriendship,setLoading, friendshipId);
    return { data, errorMessage };
  };

  return { toggleFriendship, sendFriendship, loading };
};

export default useFriendshipAction;
