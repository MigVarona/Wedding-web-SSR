import RSVPForm from '../app/components/RsvpForm';
import FileUpload from '../app/components/FileUpload';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ffce1e] px-4 py-8 flex flex-col items-center justify-between">
      <div className="text-center mt-20">
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

        <section className="w-full max-w-2xl mx-auto mt-20 my-8 bg-[#FFB7D5] p-4 rounded-lg">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/2fOGsYH2vNUrVBfOB8P5q0?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </section>

        <section className="w-full max-w-2xl mx-auto mt-20 my-8">
          <h2 className="text-3xl font-bold mb-6 text-[#F5F0E8]">RSVP</h2>
          <RSVPForm />
        </section>

        <section className="w-full max-w-2xl mx-auto mt-20 my-8">
          <h2 className="text-3xl font-bold mb-6 text-[#F5F0E8]">Subir archivo</h2>
          <FileUpload />
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

