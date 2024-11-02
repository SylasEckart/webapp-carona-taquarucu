import { errorHandler } from "@/lib/helpers";
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
    return { data,errorMessage:error && error.code && errorHandler(error.code) };
};

export const signUp = async (email: string, password: string, name: string, phone: string) => {
    
    const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: { 
                phone,
                name,
             }
        }
    });

    return { data: signUpData, errorMessage: signUpError && signUpError.code && errorHandler(signUpError.code) };
    
};