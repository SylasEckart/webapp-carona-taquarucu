/* eslint-disable @typescript-eslint/no-explicit-any */
// import { errorHandler } from "@/lib/helpers";v
import { supabaseClient } from "@/utils/supabase/client";
import { User } from "@/types/Interfaces";

export const fetchUserData = async (email:string) => {

    const { data, error } = await supabaseClient
                                .from('users')
                                .select('*')
                                .eq('email',email)
                                .single() as {data: User, error: any};

    return {data, error};
}