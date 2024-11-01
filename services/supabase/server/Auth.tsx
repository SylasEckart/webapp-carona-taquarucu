import { createClient } from "@/utils/supabase/server";


export const fetchUser = async () => {
    'use client'

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    
    return {data,error};
};