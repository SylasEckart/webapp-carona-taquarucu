import { errorHandler } from "@/lib/helpers";
import { createClient } from "@/utils/supabase/server";


export const fetchUser = async () => {
    'use server'

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    
    return {data,error};
};


export const logout = async () => {
    'use server'
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    return {errorMessage:error && error.code && errorHandler(error.code)};
};