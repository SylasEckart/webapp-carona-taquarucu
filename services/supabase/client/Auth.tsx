import { supabaseClient } from "@/utils/supabase/client";


export const fetchUser = async () => {
    const { data, error } = await supabaseClient.auth.getUser();
    return {data,error};
};

export const login = async (email: string, password: string) => {
    const { data,error } = await supabaseClient.auth.signInWithPassword({
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
    const { data,error } = await supabaseClient.auth.signUp({
        email,
        password,
    });
    if (error) {
        throw error;
    }
    return { data,error };
};