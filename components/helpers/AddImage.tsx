'use client'

import { motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@mui/material'
import { AddAPhotoRounded, CloseRounded, Camera } from '@mui/icons-material'
import { removeImageFromSupabase, uploadImageToSupabase } from '@/services/supabase/client/Storage'

// Define types for photo data and component props
interface Photo {
  publicUrl: string;
  fileName: string;
}

interface AddImageProps {
  multiple?: boolean;
}

// Reusable animation variants for photo components
const photoVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
    },
  },
};

export default function AddImage({ multiple = false }: AddImageProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photo, setPhoto] = useState<Photo | null>(null);

  const handleFileUpload = async (file: File) => {
    const userId = "user123";
    const id = "image"; 
    const result = await uploadImageToSupabase(file, userId, id);

    if (!result) return;

    if (multiple) {
      setPhotos([...photos, { publicUrl: result.publicUrl, fileName: result.fileName }]);
    } else {
      setPhoto({ publicUrl: result.publicUrl, fileName: result.fileName });
    }
  };

  const handleRemovePhoto = async (fileName: string, index?: number) => {
    await removeImageFromSupabase(fileName);
    if (multiple && typeof index === 'number') {
      setPhotos(photos.filter((_, i) => i !== index));
    } else {
      setPhoto(null);
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Add Photo{multiple ? 's' : ''}</label>
      {multiple ? (
        <MultiplePhotoUpload photos={photos} onRemovePhoto={handleRemovePhoto} onFileChange={onFileChange} />
      ) : (
        <SinglePhotoUpload photo={photo} onRemovePhoto={handleRemovePhoto} onFileChange={onFileChange} />
      )}
    </div>
  );
}

interface MultiplePhotoUploadProps {
  photos: Photo[];
  onRemovePhoto: (fileName: string, index?: number) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function MultiplePhotoUpload({ photos, onRemovePhoto, onFileChange }: MultiplePhotoUploadProps) {
  return (
    <motion.div
      className="grid grid-cols-3 gap-2"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {photos.map((photo, index) => (
        <PhotoThumbnail
          key={index}
          photo={photo}
          onRemove={() => onRemovePhoto(photo.fileName, index)}
          variants={photoVariants}
        />
      ))}
      {photos.length < 3 && (
        <UploadButton onFileChange={onFileChange} variants={photoVariants} />
      )}
    </motion.div>
  );
}

interface SinglePhotoUploadProps {
  photo: Photo | null;
  onRemovePhoto: (fileName: string) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SinglePhotoUpload({ photo, onRemovePhoto, onFileChange }: SinglePhotoUploadProps) {
  return (
    <div className="flex flex-col items-center">
      {photo ? (
        <PhotoThumbnail
          photo={photo}
          onRemove={() => onRemovePhoto(photo.fileName)}
          variants={photoVariants}
        />
      ) : (
        <UploadButton onFileChange={onFileChange} variants={photoVariants} />
      )}
    </div>
  );
}

interface PhotoThumbnailProps {
  photo: Photo;
  onRemove: () => void;
  variants: Variants;
}

function PhotoThumbnail({ photo, onRemove, variants }: PhotoThumbnailProps) {
  return (
    <motion.div
      className="relative aspect-square rounded-lg overflow-hidden"
      variants={variants}
    >
      <img src={photo.publicUrl} alt="Uploaded photo" className="object-cover w-full h-full" />
      <Button
        variant="outlined"
        size="small"
        className="absolute top-1 right-1 h-6 w-6"
        onClick={onRemove}
      >
        <CloseRounded className="h-3 w-3" />
      </Button>
    </motion.div>
  );
}

interface UploadButtonProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variants: Variants;
}

function UploadButton({ onFileChange, variants }: UploadButtonProps) {
  return (
    <motion.label
      variants={variants}
      className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center cursor-pointer w-32 h-32"
    >
      <Camera className="h-6 w-6 text-muted-foreground" />
      <AddAPhotoRounded className="absolute h-6 w-6" />
      <input type="file" className="hidden" onChange={onFileChange} />
    </motion.label>
  );
}
