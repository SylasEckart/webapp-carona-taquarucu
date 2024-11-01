import { supabaseClient } from "@/utils/supabase/client";

//maps
export const isLocationWithinRange = async (latitude: number, longitude: number) => {
    const { data,error } = await supabaseClient.rpc('is_location_within_range', {
        lat: latitude,
        long: longitude,
        max_distance: 100000,
    });
    if (error) {
        throw error;
    }
    return { data,error };
}