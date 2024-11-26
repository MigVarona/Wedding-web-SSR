"use client";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const [rsvps, setRsvps] = useState([]); // Para almacenar los datos de RSVP
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  // Función para eliminar un RSVP
  const deleteRsvp = async (id) => {
    try {
      const response = await fetch(`/api/rsvp/${id}`, {
        method: "DELETE", // Método DELETE para eliminar el recurso
      });

      if (response.ok) {
        setRsvps(rsvps.filter((rsvp) => rsvp._id !== id)); // Actualiza el estado eliminando el RSVP
      } else {
        console.error("Error al eliminar el RSVP");
      }
    } catch (error) {
      console.error("Error al eliminar el RSVP:", error);
    }
  };

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const response = await fetch("/api/rsvp"); // Llamada a la API para obtener los RSVPs de MongoDB
        const data = await response.json();
        setRsvps(data.data); // Suponiendo que la respuesta tiene una propiedad 'data' que contiene los RSVPs
      } catch (error) {
        console.error("Error al obtener los RSVPs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, []);

  // Función para sumar las personas por categoría de alojamiento
  const sumGuestsByAccommodation = () => {
    return rsvps.reduce((acc, rsvp) => {
      const accommodation = rsvp.accommodation || 'Sin alojamiento'; // Asegúrate de manejar los valores vacíos
      const guests = parseInt(rsvp.guests, 10); // Asegúrate de convertir a número

      if (!acc[accommodation]) {
        acc[accommodation] = 0;
      }
      
      acc[accommodation] += guests; // Suma correctamente las personas
      return acc;
    }, {});
  };

  const accommodationSummary = sumGuestsByAccommodation();

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
        <h1 className="flex flex-wrap justify-center items-center">
          <span className="mi-fuente-personalizada text-2xl sm:text-2xl md:text-5xl lg:text-5xl xl:text-[2rem] font-bold leading-none tracking-wide text-[#F5F0E8]">
            20/09
          </span>
        </h1>
        <div className="flex justify-center mt-8">
          <ChevronDown size={120} className="text-[#F5F0E8] animate-bounce" />
        </div>

        {/* Mostrar los RSVPs aquí */}
        <section className="w-full max-w-2xl mx-auto mt-8">
          <h2 className="text-3xl font-bold mb-6 text-[#F5F0E8]">
            Lista de RSVPs
          </h2>
          {loading ? (
            <p className="text-[#F5F0E8]">Cargando...</p>
          ) : (
            <ul className="space-y-4">
              {rsvps.map((rsvp) => (
                <li key={rsvp._id} className="bg-[#FFB7D5] p-4 rounded-lg">
                  <h3 className="font-bold text-[#2A2527]">{rsvp.name}</h3>
                  <p className="text-[#2A2527]">Número de personas: {rsvp.guests}</p>
                  <p className="text-[#2A2527]">Alojamiento: {rsvp.accommodation}</p>
                  {/* Botón para eliminar el RSVP */}
                  <button
                    onClick={() => deleteRsvp(rsvp._id)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Mostrar la suma de personas por categoría */}
        <section className="w-full max-w-2xl mx-auto mt-8">
          <h2 className="text-3xl font-bold mb-6 text-[#F5F0E8]">
            Resumen por categoría de alojamiento
          </h2>
          <ul className="space-y-4">
            {Object.keys(accommodationSummary).map((accommodation) => (
              <li key={accommodation} className="bg-[#FFB7D5] p-4 rounded-lg">
                <h3 className="font-bold text-[#2A2527]">{accommodation}</h3>
                <p className="text-[#2A2527]">Total de personas: {accommodationSummary[accommodation]}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
