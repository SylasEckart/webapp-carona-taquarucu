import { errorHandler } from "@/lib/helpers";
import {supabaseClient} from "@/utils/supabase/client";

/**
 * retrieve all notifications for a user
 */

export const getNotifications = async (userId: string) => {
    try {
        const { data, error } = await supabaseClient
            .from("notifications")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });
            
        return {
            data,
            errorMessage: error ? errorHandler(error.message) : null,
        };
    } catch (error) {
        return { data: null, errorMessage: `Unexpected error: ${error}` };
    }
}