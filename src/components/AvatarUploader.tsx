"use client";

import { Button } from "@radix-ui/themes";
import { CldUploadWidget } from "next-cloudinary";

interface AvatarUploaderProps {
  onUploadSuccess: (url: string) => void;
}

export function AvatarUploader({ onUploadSuccess }: AvatarUploaderProps) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      signatureEndpoint="/api/upload"
      onSuccess={(result) => {
        if (typeof result.info === "object" && "secure_url" in result.info) {
          onUploadSuccess(result.info.secure_url);
        }
      }}
      options={{
        singleUploadAutoClose: true,
      }}
    >
      {({ open }) => {
        return (
          <Button
            variant="soft"
            onClick={() => open()}>
            Upload Avatar
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
