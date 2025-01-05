import { errorHandler } from "@/lib/helpers";
import { supabaseClient } from "@/utils/supabase/client";

export const addFriendship = async (userId: string, friendId: string) => {


    const { data, error } = await supabaseClient.from('friendships').insert({
        user_id_1: userId > friendId ? friendId : userId,
        user_id_2: friendId > userId ? friendId : userId,
        status: 'pendente',
        created_at: new Date(),
        confirmed_at: null,
        sender: userId,
    })

    return {
        data,
        errorMessage: error && error.code && errorHandler(error.message),
    }
}

export const removeFriendship = async (friendship_id: string) => {
    if(!friendship_id) return null
    const { data, error } = await supabaseClient.from('friendships').delete().eq('friendship_id', friendship_id);

    return {
        data,
        errorMessage: error && error.code && errorHandler(error.message),
    }
}

export const confirmFriendship = async (friendship_id: string) => {
    console.log('aqui',friendship_id)
    if(!friendship_id) return null

    const { error } = await supabaseClient.from('friendships').update({
        status: 'confirmada',
        confirmed_at: new Date(),
    }).eq('friendship_id', friendship_id);

    return {
        errorMessage: error && error.code && errorHandler(error.message),
    }
}

export const searchFriendships = async (userId:string) => {
    const { data, error } = await supabaseClient.from('friendships')
                                    .select('*')
                                    .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`)

return {
    data,
    errorMessage: error && error.code && errorHandler(error.code),
}
}