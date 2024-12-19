"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center text-red-600 bg-white p-8  shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-background")) {
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black px-4 py-12">
      <h1 className="mi-fuente-personalizada2 text-6xl md:text-7xl mb-12 text-center text-white font-bold tracking-wider">
        Cristina & Miguel
      </h1>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {photos.length > 0 ? (
          photos.map((photo) => (
            <motion.div
              key={photo.cid}
              className="group relative overflow-hidden  shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal(photo)}
            >
              <img
                src={`https://${PINATA_GATEWAY}/files/${photo.cid}`}
                alt={photo.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
           
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 text-xl">
            No se encontraron fotos en el grupo.
          </p>
        )}
      </motion.div>

      {selectedPhoto && (
        <motion.div
          className="modal-background fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClickOutside}
        >
          <motion.div 
            className="relative bg-white  shadow-2xl max-w-5xl w-full m-4 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 text-3xl font-bold z-10"
              onClick={closeModal}
            >
              ×
            </button>
            <motion.img
              src={`https://${PINATA_GATEWAY}/files/${selectedPhoto.cid}`}
              alt={selectedPhoto.name}
              className="w-full h-auto max-h-[90vh] object-contain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            />
           
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

