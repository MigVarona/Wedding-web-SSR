"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function FileUpload() {
  const [files, setFiles] = useState([]); // Cambiado de 'file' a 'files' para almacenar múltiples archivos
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]); // Array para almacenar las URLs de los archivos subidos

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files)); // Guardamos todos los archivos seleccionados
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 0) {
      setUploading(true);
      try {
        const uploadedUrlsTemp = [];
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));
          formData.append(
            "pinataMetadata",
            JSON.stringify({
              name: file.name,
              keyvalues: { customKey: "customValue" },
            })
          );

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Error al subir archivo a Pinata");
          }

          const data = await response.json();
          uploadedUrlsTemp.push(data.pinataUrl); // Almacenamos la URL de cada archivo subido
        }

        setUploadedUrls(uploadedUrlsTemp); // Actualizamos las URLs de todos los archivos subidos
      } catch (error) {
        console.error("Error uploading files to Pinata:", error);
        alert(
          "No se pudieron subir los archivos. Por favor, inténtalo nuevamente."
        );
      } finally {
        setUploading(false);
        setFiles([]); // Limpiamos el estado de los archivos
        e.target.reset(); // Limpiamos el formulario
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-[#FFB7D5] p-6 rounded-lg"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="file-upload" className="text-[#2A2527]">
            Subir archivos
          </Label>
          <Input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="w-full bg-[#F5F0E8] text-[#2A2527]"
            required
            multiple // Permite seleccionar múltiples archivos
            disabled={uploading}
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full mt-6 bg-[#ffce1e] text-[#2A2527] hover:bg-[#ffd84e]"
        disabled={uploading || files.length === 0}
      >
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subiendo...
          </>
        ) : (
          "Subir archivos"
        )}
      </Button>
      {uploadedUrls.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-[#2A2527]">Archivos subidos con éxito!</p>
        </div>
      )}
      <div className="mt-6 text-center">
        <Link href="/pics">
          <Button className="bg-[#ffce1e] text-[#2A2527] hover:bg-[#ffd84e]">
            Ir a la Galería
          </Button>
        </Link>
      </div>
    </form>
  );
}
