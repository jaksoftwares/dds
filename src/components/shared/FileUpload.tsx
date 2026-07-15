"use client";

import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadProps {
  onUploadSuccess: (fileUrl: string, fileName: string, fileType: string) => void;
  buttonText?: string;
  className?: string;
}

export function FileUpload({ onUploadSuccess, buttonText = "Upload File", className }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    setIsUploading(false);
    if (result.info && typeof result.info !== "string") {
      const fileUrl = result.info.secure_url;
      const fileName = result.info.original_filename || "Uploaded File";
      const fileType = result.info.resource_type || "auto";
      
      onUploadSuccess(fileUrl, fileName, fileType);
      toast.success("File uploaded successfully");
    }
  };

  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary/sign"
      onSuccess={handleUploadSuccess}
      onOpen={() => setIsUploading(true)}
      onClose={() => setIsUploading(false)}
      options={{
        resourceType: "auto", // allow any file type
        folder: "dds-projects",
      }}
    >
      {({ open }) => {
        return (
          <Button
            type="button"
            variant="outline"
            className={`flex items-center gap-2 ${className}`}
            onClick={() => open()}
            disabled={isUploading}
          >
            <UploadCloud className="w-4 h-4" />
            {isUploading ? "Uploading..." : buttonText}
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
