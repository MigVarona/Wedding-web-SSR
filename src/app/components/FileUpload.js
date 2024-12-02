'use client'

import { useState } from 'react';
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // Here you would typically upload the file to your server
      console.log('File to upload:', file);
      // Reset the file input after upload
      setFile(null);
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-[#FFB7D5] p-6 rounded-lg">
      <div className="space-y-4">
        <div>
          <Label htmlFor="file-upload" className="text-[#2A2527]">Subir archivo</Label>
          <Input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="w-full bg-[#F5F0E8] text-[#2A2527]"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full mt-6 bg-[#ffce1e] text-[#2A2527] hover:bg-[#ffd84e]">
        Subir archivo
      </Button>
    </form>
  );
}

