// import { errorHandler } from "@/lib/helpers";v
import { supabaseClient } from "@/utils/supabase/client";


export const fetchUserData = async (email:string) => {
    const { data, error } = await supabaseClient
                                .from('users')
                                .select('*')
                                .eq('email',email)
                                .single();

    return {data,error};
}