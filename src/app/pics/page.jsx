'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importa los íconos

const PINATA_GATEWAY = "blue-used-tarsier-623.mypinata.cloud";

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch("/api/photos", { method: "GET" });
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Error al obtener las fotos: ${errorData}`);
        }
        const data = await response.json();
        console.log("Fotos obtenidas:", data);
        setPhotos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center text-red-600 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const openModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-background")) {
      closeModal();
    }
  };

  const showNextPhoto = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const showPreviousPhoto = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-teal-100 px-4 py-12">
      <Link href="/">
        <h1 className="mi-fuente-personalizada2 text-6xl md:text-7xl mb-12 text-center text-white tracking-wider">
          Cristina & Miguel
        </h1>
      </Link>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <div className="col-span-full text-center text-gray-400 text-xl flex items-center justify-center space-x-4">
            <div className="loader"></div>
          </div>
        ) : photos.length > 0 ? (
          photos.map((photo, index) => (
            <motion.div
              key={photo.cid}
              className="group relative overflow-hidden shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal(index)}
            >
              <div className="relative w-full h-64 bg-gray-800">
                <img
                  src={`https://${PINATA_GATEWAY}/files/${photo.cid}`}
                  alt={photo.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  onLoad={(e) => e.target.classList.remove("opacity-0")}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 text-xl">
            No se encontraron fotos.
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
            className="relative bg-white shadow-2xl max-w-5xl w-full m-4 overflow-hidden"
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
            <button
              className="absolute top-1/2 left-4 text-black bg-black hover:bg-opacity-80 rounded-full p-3 transition-transform transform -translate-y-1/2 appearance-none focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                showPreviousPhoto();
              }}
            >
              <FaArrowLeft className="w-4 h-4 text-white" /> {/* Ícono de flecha izquierda */}
            </button>
            <motion.img
              src={`https://${PINATA_GATEWAY}/files/${selectedPhoto.cid}`}
              alt={selectedPhoto.name}
              className="w-full h-auto max-h-[90vh] object-contain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            />
            <button
              className="absolute top-1/2 right-4 text-black bg-black hover:bg-opacity-80 rounded-full p-3 transition-transform transform -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation();
                showNextPhoto();
              }}
            >
              <FaArrowRight className="w-4 h-4 text-white" /> {/* Ícono de flecha derecha */}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
