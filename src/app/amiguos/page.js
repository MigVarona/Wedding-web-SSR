"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Trash2, RefreshCw, Users, Home, Calendar } from 'lucide-react';
import Link from "next/link";

export default function Dashboard() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalGuests, setTotalGuests] = useState(0);
  const [accommodationSummary, setAccommodationSummary] = useState({});

  const deleteRsvp = async (id) => {
    try {
      const response = await fetch(`/api/rsvp/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRsvps(rsvps.filter((rsvp) => rsvp._id !== id));
        updateSummary(rsvps.filter((rsvp) => rsvp._id !== id));
      } else {
        console.error("Error al eliminar el RSVP");
      }
    } catch (error) {
      console.error("Error al eliminar el RSVP:", error);
    }
  };

  const fetchRSVPs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/rsvp");
      const data = await response.json();
      setRsvps(data.data);
      updateSummary(data.data);
    } catch (error) {
      console.error("Error al obtener los RSVPs:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSummary = (data) => {
    const summary = data.reduce((acc, rsvp) => {
      const accommodation = rsvp.accommodation || "Sin alojamiento";
      const guests = parseInt(rsvp.guests, 10);

      if (!acc[accommodation]) {
        acc[accommodation] = 0;
      }

      acc[accommodation] += guests;
      return acc;
    }, {});

    setAccommodationSummary(summary);
    setTotalGuests(Object.values(summary).reduce((a, b) => a + b, 0));
  };

  useEffect(() => {
    fetchRSVPs();
  }, []);

  return (
    <main className="min-h-screen bg-[#05B6CB] flex flex-col items-center justify-between overflow-x-hidden">
      <div className="w-full max-w-[100vw] mx-auto p-6 border-8 border-[#05B6CB] bg-[#FF90C0] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" passHref>
            <h1 className="flex flex-wrap items-center space-x-4">
              <span className="mi-fuente-personalizada2 text-4xl sm:text-5xl md:text-6xl leading-none tracking-wide text-white" style={{ textShadow: "2px 2px 0px black" }}>
                Cristina & Miguel
              </span>
            </h1>
          </Link>
          <button onClick={fetchRSVPs} className="bg-[#F5F0E8] text-[#05B6CB] p-2 rounded-full hover:bg-[#FFB7D5] transition-colors">
            <RefreshCw size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#FFB7D5] p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2 text-[#2A2527] flex items-center">
              <Users className="mr-2" /> Total de Invitados
            </h2>
            <p className="text-3xl font-bold text-[#05B6CB]">{totalGuests}</p>
          </div>
          <div className="bg-[#FFB7D5] p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2 text-[#2A2527] flex items-center">
              <Home className="mr-2" /> Categorías de Alojamiento
            </h2>
            <p className="text-3xl font-bold text-[#05B6CB]">{Object.keys(accommodationSummary).length}</p>
          </div>
          <div className="bg-[#FFB7D5] p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2 text-[#2A2527] flex items-center">
              <Calendar className="mr-2" /> Fecha del Evento
            </h2>
            <p className="text-3xl font-bold text-[#05B6CB]">20/09</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-[#F5F0E8] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#05B6CB]">Lista de Invitados</h2>
            {loading ? (
              <p className="text-[#2A2527]">Cargando...</p>
            ) : (
              <ul className="space-y-4 max-h-[400px] overflow-y-auto">
                {rsvps.map((rsvp) => (
                  <li key={rsvp._id} className="bg-[#FFB7D5] p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-[#2A2527]">{rsvp.name}</h3>
                      <p className="text-[#2A2527]">Personas: {rsvp.guests}</p>
                      <p className="text-[#2A2527]">Alojamiento: {rsvp.accommodation}</p>
                      <p className="text-[#2A2527]">Noches: {rsvp.nights}</p>
                    </div>
                    <button
                      onClick={() => deleteRsvp(rsvp._id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="bg-[#F5F0E8] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#05B6CB]">Resumen por Alojamiento</h2>
            <ul className="space-y-4 max-h-[400px] overflow-y-auto">
              {Object.entries(accommodationSummary).map(([accommodation, count]) => (
                <li key={accommodation} className="bg-[#FFB7D5] p-4 rounded-lg">
                  <h3 className="font-bold text-[#2A2527]">{accommodation}</h3>
                  <p className="text-[#2A2527]">Total de personas: {count}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex justify-center mt-8">
          <ChevronDown size={60} className="text-[#F5F0E8] animate-bounce" />
        </div>
      </div>
    </main>
  );
}

