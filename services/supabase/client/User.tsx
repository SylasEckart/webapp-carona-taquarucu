/* eslint-disable @typescript-eslint/no-explicit-any */
// import { errorHandler } from "@/lib/helpers";v
import { supabaseClient } from "@/utils/supabase/client";
import { User } from "@/types/Interfaces";
import { ListUsers } from "@/app/context/AppContext";

export const fetchUserData = async (email:string) => {

    const { data, error } = await supabaseClient
                                .from('users')
                                .select('*')
                                .eq('email',email)
                                .single() as {data: User, error: any};

    return {data, error};
}

export const getAllUsers = async () => {
    
    const { data, error } = await supabaseClient
                                .from('users')
                                .select('name,friendships,user_id')
    if(error) throw error;
    const addData = data.map((user:ListUsers) => {
        user.isFriend = false;
        return user;
    })
    return {data:addData};
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

