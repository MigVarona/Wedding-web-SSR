"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import RSVPForm from "../app/components/RsvpForm";
import FileUpload from "../app/components/FileUpload";
import { ChevronDown, MapPin } from "lucide-react";
import GuestBookForm from "../app/components/GuestBookForm";
import myButtonImage from "../../public/Y2K Sticker-03.png";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);

  const fetchMessages = async () => {
    const response = await fetch("/api/guestbook");
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  const handlePlayClick = () => {
    setShowPlayer(true);
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <main className="min-h-screen bg-[#05B6CB]    flex flex-col items-center justify-between overflow-x-hidden">
        <div className="w-full max-w-[100vw] sm:max-w-4xl mx-auto p-6 sm:p-8 border-8 sm:border-8 md:border-6 lg:border-4 border-[#05B6CB] bg-[#FF90C0] rounded-2xl overflow-hidden shadow-2xl">
          <div className="text-center space-y-12">
            <section className="my-8 p-4 rounded-lg bg-[#FFB7D5] shadow-inner">
              {!showPlayer ? (
                <div
                  onClick={handlePlayClick}
                  className="flex justify-center items-center cursor-pointer w-full transition-transform hover:scale-105"
                >
                  <Image
                    src={myButtonImage}
                    alt="Botón de reproducción"
                    width={152}
                    height={150}
                    className="filter drop-shadow-lg"
                  />
                </div>
              ) : (
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/2fOGsYH2vNUrVBfOB8P5q0?utm_source=generator"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="shadow-lg"
                ></iframe>
              )}
            </section>
            <h1 className="flex flex-wrap justify-center items-center space-x-4">
              <span
                className="mi-fuente-personalizada2 text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-none tracking-wide text-white"
                style={{ textShadow: "4px 4px 0px black" }}
              >
                Cristina
              </span>
              <span
                className="mi-fuente-personalizada2 text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-none tracking-wide text-white"
                style={{ textShadow: "4px 4px 0px black" }}
              >
                Miguel
              </span>
            </h1>

            <img
              src="/y2k Asset by Annorastd-19.svg"
              alt="Icono decorativo"
              className="w-full max-w-[900px] h-auto mx-auto mt-4  drop-shadow-lg"
            />
            <h2 className="flex mt-8 flex-wrap justify-center items-center space-x-4">
              <span className="mi-fuente-personalizada text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4rem] font-bold leading-none tracking-wide text-white mb-2 sm:mb-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                Tunkashila
              </span>
              <span className="mi-fuente-personalizada text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4rem] font-bold leading-none tracking-wide text-[#FFB7D5] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                Casavieja
              </span>
            </h2>

            <h3 className="flex flex-wrap justify-center items-center">
              <span className="mi-fuente-personalizada text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3rem] font-bold leading-none tracking-wide text-white mt-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                20/09
              </span>
            </h3>
            <Link
              href="https://tunkashila.com/#situacion"
              target="_blank"
              rel="noopener noreferrer"
              className="mi-fuente-personalizada inline-flex items-center justify-center px-6 py-3 mt-4 text-lg  text-white bg-[#F896D8] rounded-md hover:bg-[#FFB7D5] transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              <MapPin className=" w-5 h-5 mr-2" />
              Cómo llegar
            </Link>

            <div className="flex justify-center mt-8">
              <ChevronDown
                size={120}
                className="text-[#F5F0E8] animate-bounce filter drop-shadow-lg"
              />
            </div>

            <div className="flex justify-center items-center mt-12">
              <iframe
                src="https://giphy.com/embed/VKQBveX0MZu1PXRFE8"
                width="300"
                height="300"
                frameBorder="0"
                className="giphy-embed rounded-xl shadow-lg"
                allowFullScreen
              ></iframe>
            </div>

            <div className="flex justify-center mt-8">
              <ChevronDown
                size={120}
                className="text-[#F5F0E8] animate-bounce filter drop-shadow-lg"
              />
            </div>

            <section className="w-full max-w-2xl mx-auto relative bg-[#FFB7D5] p-8 rounded-xl shadow-lg">
              <h2 className="flex flex-wrap justify-center items-center text-center">
                <span className="mi-fuente-personalizada text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-bold leading-none tracking-wide text-[#F5F0E8] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  Reserva
                </span>
                <span className="mi-fuente-personalizada text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-bold leading-none tracking-wide text-[#F896D8] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  tusitio
                </span>
              </h2>
              <div className="form-container relative w-full max-w-2xl">
                <div className="flex justify-center items-center -mt-10 sm:-mt-2 md:mt-0">
                  <img
                    src="/Y2K Sticker-04.png"
                    alt="Icono decorativo"
                    className="w-[200px] h-[200px] filter drop-shadow-lg"
                  />
                </div>
                <RSVPForm className="mt-8" />
              </div>
            </section>

            <div className="flex justify-center mt-8">
              <ChevronDown
                size={120}
                className="text-[#F5F0E8] animate-bounce filter drop-shadow-lg"
              />
            </div>

            <section className="w-full max-w-2xl mx-auto mt-20 my-12 bg-[#FFB7D5] p-8 rounded-xl shadow-lg">
              <h2 className="flex mb-12 flex-wrap justify-center items-center">
                <span className="mi-fuente-personalizada text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-bold leading-none tracking-wide text-[#F5F0E8] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  Sube
                </span>
                <span className="mi-fuente-personalizada text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-bold leading-none tracking-wide text-[#F896D8] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  tusfotos
                </span>
              </h2>
              <div className="flex justify-center items-center mt-8">
                <iframe
                  src="https://giphy.com/embed/IUEG0DmJxgRWM"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  className="giphy-embed max-w-[300px]"
                  allowFullScreen
                ></iframe>
              </div>
              <FileUpload />
            </section>

            <section className="w-full max-w-2xl mx-auto mt-20 my-12 bg-[#FFB7D5] p-8 rounded-xl shadow-lg">
              <h2 className="flex mb-12 flex-wrap justify-center items-center">
                <span className="mi-fuente-personalizada text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-bold leading-none tracking-wide text-[#F5F0E8] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  DejaTu
                </span>
                <span className="mi-fuente-personalizada text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-bold leading-none tracking-wide text-[#F896D8] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  mensaje
                </span>
              </h2>
              <div className="form-container relative w-full max-w-2xl">
                <div className="flex justify-center items-center -mt-10 sm:-mt-2 md:mt-0">
                  <img
                    src="/Y2K Sticker-01.png"
                    alt="Icono decorativo"
                    className="w-[200px] h-[200px] filter drop-shadow-lg"
                  />
                </div>
              </div>
              <GuestBookForm onNewMessage={handleNewMessage} />
            </section>

            <section className="w-full max-w-2xl mx-auto mt-20 my-12 bg-[#FFB7D5] p-8 rounded-xl shadow-lg">
              <h2 className="text-4xl font-bold mb-8 text-[#F5F0E8] text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                Mensajes Recibidos
              </h2>
              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message._id}
                      className="bg-[#F5F0E8] p-4 rounded-lg shadow-md"
                    >
                      <p className="font-bold text-lg text-[#F896D8]">
                        {message.name}
                      </p>
                      <p className="text-gray-700">{message.message}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[#F5F0E8]">
                    No hay mensajes aún.
                  </p>
                )}
              </div>
            </section>
          </div>

          <footer className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-end text-[#F5F0E8] text-xs sm:text-sm mt-12 space-y-4 sm:space-y-0">
            <p className="max-w-2xl text-center sm:text-left">
              A versatile and modern typeface characterized by its narrow,
              streamlined letterforms. This font is ideal for space-efficient
              design, offering a clean and elegant aesthetic without
              compromising readability.
            </p>
            <span className="text-center sm:text-right">
              Follow Me at @dannyaldana
            </span>
          </footer>
        </div>
      </main>
    </>
  );
}
