'use client'

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Loader2 } from 'lucide-react';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file); // Archivo que deseas subir
        formData.append('pinataOptions', JSON.stringify({ cidVersion: 1 }));
        formData.append(
          'pinataMetadata',
          JSON.stringify({
            name: file.name,
            keyvalues: {
              customKey: 'customValue',
            },
          })
        );

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error al subir archivo a Pinata');
        }

        const data = await response.json();
        setUploadedUrl(data.pinataUrl); // Asume que tu endpoint devuelve `pinataUrl`
      } catch (error) {
        console.error('Error uploading file to Pinata:', error);
        alert('No se pudo subir el archivo. Por favor, inténtalo nuevamente.');
      } finally {
        setUploading(false);
        setFile(null);
        e.target.reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-[#FFB7D5] p-6 rounded-lg">
      <div className="space-y-4">
        <div>
          <Label htmlFor="file-upload" className="text-[#2A2527]">
            Subir archivo
          </Label>
          <Input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="w-full bg-[#F5F0E8] text-[#2A2527]"
            required
            disabled={uploading}
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full mt-6 bg-[#ffce1e] text-[#2A2527] hover:bg-[#ffd84e]"
        disabled={uploading || !file}
      >
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subiendo...
          </>
        ) : (
          'Subir archivo'
        )}
      </Button>
      {uploadedUrl && (
        <div className="mt-4 text-center">
          <p className="text-[#2A2527]">Archivo subido con éxito!</p>
          <a
            href={`https://${uploadedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Ver archivo en Pinata
          </a>
        </div>
      )}
    </form>
  );
}
