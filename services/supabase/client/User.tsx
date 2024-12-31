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

export const getAllUsers = async (userEmail?: string) => {
    
    const { data, error } = await supabaseClient
                                .from('users')
                                .select('*')
    

    if(error) throw error;
    const filteredData = data.filter((user: User) => user.email !== userEmail);
    return {data:filteredData};
}



export const setCurrentUserLocation = async (email:string, location: {lat:number,lng:number}) => {
    console.log('location',location)

    const {data, error } = await supabaseClient
                                .from('users')
                                .update({
                                    currentlocation: `POINT(${location.lat}} ${location.lng})`
                                })
                                .eq('email',email)
                                .select('*')
    console.log('error',error,data)
    return {data,error};
}

