"use client";

import { useEffect, useState } from "react";

const PINATA_GATEWAY = "blue-used-tarsier-623.mypinata.cloud"; // Reemplaza esto con tu gateway de Pinata

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch("/api/photos", {
          method: "GET",
        });
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Error al obtener las fotos: ${errorData}`);
        }
        const data = await response.json();
        console.log("Fotos obtenidas:", data); // Verifica la estructura de los datos
        setPhotos(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPhotos();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Fotos del Grupo</h1>
      <div className="grid grid-cols-3 gap-4">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.cid} className="border p-2">
             <img
  src={`https://blue-used-tarsier-623.mypinata.cloud/files/${photo.cid}`}
  alt={photo.name}
  className="w-full h-auto"
/>

            </div>
          ))
        ) : (
          <p>No se encontraron fotos en el grupo.</p>
        )}
      </div>
    </div>
  );
}
