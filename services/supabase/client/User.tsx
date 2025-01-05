// import { errorHandler } from "@/lib/helpers";v
import { User } from "@/types/Interfaces";
import { supabaseClient } from "@/utils/supabase/client";

export const fetchUserData = async (email:string) => {

    const { data, error } = await supabaseClient
                                .from('users')
                                .select('*')
                                .eq('email',email)
                                .single() 

    return {data: data as unknown as User, error};
}


export const getAllUsersButMe = async (userEmail?: string) => {
    
    const { data, error } = await supabaseClient
                                .from('users')
                                .select('user_id,name,email') 
    

    if(error) throw error;

    const filteredData = data as unknown as {email:string,name:string,user_id:string}[] && data.filter(user=>user.email !== userEmail)
    return {data:filteredData};
}



export const setCurrentUserLocation = async (email:string, location: {lat:number,lng:number}) => {

    const {data, error } = await supabaseClient
                                .from('users')
                                .update({
                                    currentlocation: `POINT(${location.lat}} ${location.lng})`
                                })
                                .eq('email',email)
                                .select('*')
    return {data,error};
}

