"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

export function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file first",
      });
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "File uploaded successfully",
        });
        // You can perform additional operations like saving to the database here
      } else {
        toast({
          title: "Upload Error",
          description: result.error,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while uploading the file",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Input 
        type="file" 
        onChange={handleFileChange}
        accept="image/*"
      />
      <Button 
        onClick={handleUpload} 
        disabled={uploading}
      >
        {uploading ? <Loader2 className="animate-spin" />  : <Upload/>}
      </Button>
    </div>
  );
}
