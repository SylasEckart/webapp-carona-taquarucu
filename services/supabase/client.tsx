import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const login = async (email: string, password: string) => {
    const { data,error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        throw error;
    }
    return { data,error };
};

export const signUp = async (email: string, password: string,name: string, phone: string) => {
    console.log('nome',name,phone)
    const { data,error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) {
        throw error;
    }
    return { data,error };
};

export const isLocationWithinRange = async (latitude: number, longitude: number) => {
    const { data,error } = await supabase.rpc('is_location_within_range', {
        lat: latitude,
        long: longitude,
        max_distance: 100000,
    });
    if (error) {
        throw error;
    }
    return { data,error };
}