"use client";

import { useEffect, useState } from "react";

const PINATA_GATEWAY = "blue-used-tarsier-623.mypinata.cloud";

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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
        console.log("Fotos obtenidas:", data);
        setPhotos(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPhotos();
  }, []);

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="px-4 py-8 bg-black">
      <h1 className="mi-fuente-personalizada2 text-7xl mb-6 text-center text-white">Cristina & Miguel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div
              key={photo.cid}
              className="border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 cursor-pointer"
              onClick={() => openModal(photo)}
            >
              <img
                src={`https://blue-used-tarsier-623.mypinata.cloud/files/${photo.cid}`}
                alt={photo.name}
                className="w-full h-64 object-cover"
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No se encontraron fotos en el grupo.</p>
        )}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300">
          <div className="relative bg-black p-6 rounded-lg shadow-xl max-w-4xl overflow-hidden transform transition-transform scale-100 hover:scale-105">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-400 text-xl font-bold"
              onClick={closeModal}
            >
              ×
            </button>
            <img
              src={`https://blue-used-tarsier-623.mypinata.cloud/files/${selectedPhoto.cid}`}
              alt={selectedPhoto.name}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
