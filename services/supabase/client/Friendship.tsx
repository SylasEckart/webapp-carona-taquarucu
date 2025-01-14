import { errorHandler } from "@/lib/helpers";
import { Friendship } from "@/types/Interfaces";
import { supabaseClient } from "@/utils/supabase/client";

/**
 * Add a new friendship record
 */
export const addFriendship = async (userId: string, friendId: string) => {
  if (!userId || !friendId) {
    return { data: null, errorMessage: "Invalid user IDs provided." };
  }

  try {
    const { data, error } = await supabaseClient
      .from("friendships")
      .insert({
      user_id_1: userId < friendId ? userId : friendId,
      user_id_2: friendId > userId ? friendId : userId,
      status: "pendente",
      created_at: new Date().toISOString(),
      confirmed_at: null,
      sender: userId,
      })
      .select("*")
      .single();

    return {
      data,
      errorMessage: error ? errorHandler(error.message) : null,
    };
  } catch (error) {
    return { data: null, errorMessage: `Unexpected error: ${error}` };
  }
};

/**
 * Remove a friendship by ID
 */
export const removeFriendship = async (friendship_id: string) => {
  if (!friendship_id) {
    return { data: null, errorMessage: "Friendship ID is required." };
  }

  try {
    const { data, error } = await supabaseClient
      .from("friendships")
      .delete()
      .eq("friendship_id", friendship_id);

    return {
      data,
      errorMessage: error ? errorHandler(error.message) : null,
    };
  } catch (error) {
    return { data: null, errorMessage: `Unexpected error: ${error}` };
  }
};

/**
 * Confirm a friendship by ID
 */
export const confirmFriendship = async (friendship_id: string, userId:string) => {
  if (!friendship_id) {
    return { errorMessage: "Friendship ID is required." };
  }

  try {
    const { data, error } = await supabaseClient
      .from("friendships")
      .update({
      sender: userId,
      status: "confirmada",
      confirmed_at: new Date().toISOString(),
      })
      .eq("friendship_id", friendship_id)
      .select("*")
      .single();

    return {
      data,
      errorMessage: error ? errorHandler(error.message) : null,
    };
  } catch (error) {
    return { errorMessage: `Unexpected error: ${error}` };
  }
};

/**
 * Search for friendships involving a specific user
 */
export const searchFriendships = async (userId: string) => {
  if (!userId) {
    return { data: null, errorMessage: "User ID is required." };
  }

  try {
    const { data, error } = await supabaseClient
      .from("friendships")
      .select("*")
      .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`);

    return {
      data: data as Friendship[] | null,
      errorMessage: error ? errorHandler(error.message) : null,
    };
  } catch (error) {
    return { data: null, errorMessage: `Unexpected error: ${error}` };
  }
};
