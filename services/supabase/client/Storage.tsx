
import { supabaseClient } from "@/utils/supabase/client";


export const uploadImageToSupabase = async (file: File,userId:string,id:string) => {

    const fileName = `${userId}/${id}-${Date.now()}.${file.name.split('.').pop()}`;
    const { data, error } = await supabaseClient.storage
        .from('images')
        .upload(fileName, file);
  
        console.log('upload',data,error)
  
    if (error) {
        alert("Erro ao fazer upload: " + error.message);
        return null;
    }
  
    const { data:{publicUrl},} = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(data.path);
  
        console.log('upload',publicUrl)
  
  
    if (!publicUrl) {
        alert("Erro ao obter URL pública: ");
        return null;
    }
  
    return {publicUrl,fileName}
  };
  
export const removeImageFromSupabase = async (filePath:string) => await supabaseClient.storage.from('images').remove([filePath])