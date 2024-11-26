"use client"

import { useEffect, useState } from "react";
import RSVPForm from "../app/components/RsvpForm";
import FileUpload from "../app/components/FileUpload";
import { ChevronDown } from "lucide-react";
import GuestBookForm from "../app/components/GuestBookForm";
import { Zap } from "lucide-react"; // Asegúrate de tener la librería lucide-react instalada

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);

  

  // Función para obtener los mensajes del libro de visitas
  const fetchMessages = async () => {
    const response = await fetch("/api/guestbook");
    const data = await response.json();
    setMessages(data);
  };

  // Usar useEffect para cargar los mensajes al montar el componente
  useEffect(() => {
    fetchMessages();
  }, []);

  // Función para actualizar los mensajes después de enviar uno nuevo
  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  // Función para mostrar el reproductor de Spotify
  const handlePlayClick = () => {
    setShowPlayer(true); // Muestra el iframe cuando se hace clic en el ícono
  };

  return (
    <main className="min-h-screen bg-[#ffce1e] flex flex-col items-center justify-between">
      <div className="text-center ">
        {/* Sección del reproductor de Spotify */}
        <section className=" mb-20  my-8  p-4 rounded-lg">
          {!showPlayer ? (
            <button
              onClick={handlePlayClick}
              className="flex justify-center items-center bg-[#F5F0E8] text-[#FFB7D5] p-4 rounded-full"
            >
              <Zap size={48} /> {/* Ícono de música */}
            </button>
          ) : (
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/2fOGsYH2vNUrVBfOB8P5q0?utm_source=generator"
              width="35%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          )}
        </section>
        <h1 className="flex flex-wrap justify-center items-center">
          <span className="mi-fuente-personalizada text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-wide text-[#F5F0E8]">
            CRISTINA
          </span>
          <span className="mi-fuente-personalizada text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-wide text-[#FFB7D5]">
            MIGUEL
          </span>
        </h1>
        <img
          src="/y2k Asset by Annorastd-19.svg"
          alt="Icono decorativo"
          className="w-[900px] h-[100px] mx-auto mt-4 text-slate-50"
        />
        <h1 className="flex mt-8 flex-wrap justify-center items-center">
          <span className="mi-fuente-personalizada text-4xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-[4rem] font-bold leading-none tracking-wide text-[#F5F0E8]">
            Turkashila
          </span>
          <span className="mi-fuente-personalizada text-4xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-[4rem] font-bold leading-none tracking-wide text-[#FFB7D5]">
            Casavieja
          </span>
        </h1>
        <h1 className="flex flex-wrap justify-center items-center">
          <span className="mi-fuente-personalizada text-2xl sm:text-2xl md:text-5xl lg:text-5xl xl:text-[2rem] font-bold leading-none tracking-wide text-[#F5F0E8]">
            20/09
          </span>
        </h1>
        <div className="flex justify-center mt-8">
          <ChevronDown size={120} className="text-[#F5F0E8] animate-bounce" />
        </div>

        

        <div className="flex justify-center items-center mt-30">
          <iframe
            src="https://giphy.com/embed/VKQBveX0MZu1PXRFE8"
            width="300"
            height="300"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex justify-center mt-8">
          <ChevronDown size={120} className="text-[#F5F0E8] animate-bounce" />
        </div>

        <section className="w-full max-w-2xl mx-auto my-8">
          <h2 className="text-3xl font-bold mb-6 text-[#F5F0E8]">Reserva tu sitio!</h2>
          <RSVPForm />
        </section>
        <div className="flex justify-center mt-8">
          <ChevronDown size={120} className="text-[#F5F0E8] animate-bounce" />
        </div>

        <section className="w-full max-w-2xl mx-auto mt-20 my-8">
          <h2 className="text-3xl font-bold mb-6 text-[#F5F0E8]">Comparte tus fotos!</h2>
          <FileUpload />
        </section>

        {/* Sección para dejar mensajes */}
        <section className="w-full max-w-2xl mx-auto mt-20 my-8">
          <h2 className="text-3xl font-bold mb-6 text-[#F5F0E8]">Deja un mensaje en nuestro libro de visitas</h2>
          <GuestBookForm onNewMessage={handleNewMessage} />
        </section>

        {/* Sección para mostrar los mensajes */}
        <section className="w-full max-w-2xl mx-auto mt-20 my-8">
          <h2 className="text-3xl font-bold mb-6 text-[#F5F0E8]">Mensajes Recibidos</h2>
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div key={message._id} className="bg-[#F5F0E8] p-4 rounded-lg">
                  <p className="font-bold text-lg">{message.name}</p>
                  <p>{message.message}</p>
                  <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No hay mensajes aún.</p>
            )}
          </div>
        </section>
      </div>

      <footer className="w-full flex justify-between items-end text-[#F5F0E8] text-xs sm:text-sm">
        <p className="max-w-2xl">
          A versatile and modern typeface characterized by its narrow,
          streamlined letterforms. This font is ideal for space-efficient
          design, offering a clean and elegant aesthetic without compromising
          readability.
        </p>
        <span>Follow Me at @dannyaldana</span>
      </footer>
    </main>
  );
}
