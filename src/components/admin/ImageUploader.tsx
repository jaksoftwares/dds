"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export default function ImageUploader({ value, onChange, onRemove }: ImageUploaderProps) {
  const onUpload = (result: any) => {
    // result.info.secure_url contains the Cloudinary URL
    if (result.info && result.info.secure_url) {
      // Return the path starting from the folder, or the full URL.
      // Usually, just storing the full URL or the public_id is fine.
      // Let's store the full secure_url
      onChange(result.info.secure_url);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {value ? (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border border-slate-200">
          <Image
            fill
            className="object-cover"
            alt="Uploaded image"
            src={value}
          />
          <div className="absolute top-2 right-2">
            <Button type="button" size="icon" variant="destructive" onClick={onRemove}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}
          onSuccess={onUpload}
        >
          {({ open }) => {
            return (
              <div 
                onClick={() => open?.()}
                className="flex flex-col items-center justify-center w-full max-w-sm aspect-video border-2 border-dashed border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <ImagePlus className="h-10 w-10 text-slate-400 mb-2" />
                <span className="text-sm font-medium text-slate-600">Click to upload image</span>
                <span className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP</span>
              </div>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
}
