import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Pencil } from "lucide-react";
import Image from "next/image";

const PosterImageUpload: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Validate file size and type manually
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;

    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    // Check file type
    if (
      !["image/jpeg", "image/png", "image/svg+xml"].includes(selectedFile.type)
    ) {
      setError("Only JPEG, PNG, and SVG files are allowed");
      return;
    }

    // Check file size (max 2MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      setError("File size should not exceed 2MB");
      return;
    }

    // If validation passed, set image preview and file
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImagePreview(fileReader.result as string);
      setFile(selectedFile);
      setError(null); // Clear previous errors
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError("No file selected");
      return;
    }

    // Here you can call your API or handle the file upload
    console.log("Uploaded Image:", file);
    alert("Image uploaded successfully!");
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="relative">
            <div className="w-[200px] object-cover rounded-md overflow-hidden">
              <Image
                src={imagePreview || "/ourmission-banner.png"}
                alt="Poster"
                width={500}
                height={300}
              />
            </div>

            <div className="absolute top-2 right-2 text-black bg-gray-300 p-3 rounded-full text-xl">
              <Pencil size={16} />
            </div>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Poster Image</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="file-upload"
                className="text-blue-500 cursor-pointer"
              >
                Choose Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>

            {imagePreview && (
              <div className="mb-4">
                <Image
                  src={imagePreview}
                  alt="Selected"
                  width={40}
                  height={40}
                  className="w-40 h-40 object-cover rounded-md"
                />
              </div>
            )}

            <Button type="submit" className="mt-4 w-full">
              Upload Image
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PosterImageUpload;
