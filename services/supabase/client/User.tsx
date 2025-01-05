import { User } from "@/types/Interfaces";
import { supabaseClient } from "@/utils/supabase/client";

/**
 * Fetch user data by email
 */
export const fetchUserData = async (email: string) => {
  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return { data: data as User | null, error };
};

/**
 * Get all users except the one with the specified email
 */
export const getAllUsersButMe = async (userEmail?: string) => {
  const { data, error } = await supabaseClient
    .from("users")
    .select("user_id, name, email");

  if (error) {
    console.error("Error fetching users:", error);
    return { data: null, error };
  }

  // Filter out the current user
  const typedData = data as { user_id: string; name: string; email: string;}[];
  const filteredData = typedData?.filter((user) => user.email !== userEmail) || [];
  return { data: filteredData, error: null };
};

/**
 * Update the current location of a user
 */
export const setCurrentUserLocation = async (
  email: string,
  location: { lat: number; lng: number }
) => {
  const { data, error } = await supabaseClient
    .from("users")
    .update({
      currentlocation: `POINT(${location.lat} ${location.lng})`,
    })
    .eq("email", email)
    .select("*");

  return { data, error };
};
