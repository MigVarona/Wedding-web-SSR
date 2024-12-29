"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [accommodation, setAccommodation] = useState("tienda");
  const [statusMessage, setStatusMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false); // Estado para controlar la ventana emergente

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, guests, accommodation, nights };

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setStatusMessage("RSVP guardado con éxito!");
        // Limpiar los campos del formulario
        setName("");
        setGuests("");
        setNights("1"); // Restablecer a la opción predeterminada
        setAccommodation("tienda");
      } else {
        setStatusMessage("Error al guardar RSVP: " + result.message);
      }
    } catch (error) {
      setStatusMessage("Error al enviar la solicitud: " + error.message);
    }
  };

  const [nights, setNights] = useState("1");

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-[#FFB7D5] p-6 rounded-lg "
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-[#2A2527]">
            Nombre
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#F5F0E8] text-[#2A2527]"
            required
          />
        </div>
        <div>
          <Label htmlFor="guests" className="text-[#2A2527]">
            Número de personas
          </Label>
          <Input
            id="guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-[#F5F0E8] text-[#2A2527]"
            required
          />
        </div>
        <div>
          <Label className="text-[#2A2527]">Alojamiento, ¿que vas a traer?</Label>
          <RadioGroup
            value={accommodation}
            onValueChange={setAccommodation}
            className="flex mt-4 flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-2"
          >
            <div className="flex w-full sm:w-auto items-center space-x-2">
              <RadioGroupItem
                value="tienda"
                id="tienda"
                className="h-6 w-6 appearance-none border-2 border-[#2A2527] rounded-full checked:bg-[#2A2527]"
              />
              <Label htmlFor="tienda" className="text-[#2A2527]">
                Tienda
              </Label>
            </div>
            <div className="flex w-full sm:w-auto items-center space-x-2">
              <RadioGroupItem
                value="furgoneta"
                id="furgoneta"
                className="h-6 w-6 appearance-none border-2 border-[#2A2527] rounded-full checked:bg-[#2A2527]"
              />
              <Label htmlFor="furgoneta" className="text-[#2A2527]">
                Furgoneta
              </Label>
            </div>
            <div className="flex w-full sm:w-auto items-center space-x-2">
              <RadioGroupItem
                value="colchoneta"
                id="colchoneta"
                className="h-6 w-6 appearance-none border-2 border-[#2A2527] rounded-full checked:bg-[#2A2527]"
              />
              <Label htmlFor="colchoneta" className="text-[#2A2527]">
                Colchon hinchable
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div>
      <div className="flex items-center mb-2">
        <button
          type="button"
          className="mr-2 flex items-center justify-center w-6 h-6 rounded-full focus:outline-none hover:shadow-md"
          onClick={() => setShowInfo(!showInfo)}
          aria-label="Información sobre el número de noches"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h- text-[#2A2527]"
            aria-hidden="true"
          >
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm.75 15h-1.5v-6h1.5v6zm0-8h-1.5V7h1.5v2z"
            />
          </svg>
        </button>
        <Label htmlFor="nights" className="text-[#2A2527]">
          Número de noches
        </Label>
      </div>

      <select
        id="nights"
        value={nights}
        onChange={(e) => setNights(e.target.value)}
        className="w-full bg-[#F5F0E8] text-[#2A2527] border border-[#2A2527] rounded-md p-2"
      >
        <option value="1">Una noche</option>
        <option value="2">Dos noches</option>
      </select>

      {showInfo && (
        <div
          className="mt-2 p-4 bg-[#F5F0E8] text-[#2A2527] border border-[#2A2527] rounded-md shadow-md"
          role="alert"
        >
          <p>
          La noche del sábado corre por nuestra cuenta!, si quieres quedarte con nosotros hasta el lunes son 20€ / persona
          </p>
          <button
            type="button"
            className="mt-2 text-sm text-blue-500 underline"
            onClick={() => setShowInfo(false)}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
      </div>
      <Button
        type="submit"
        className="w-full mt-6 bg-[#ffce1e] text-[#2A2527] hover:bg-[#ffd84e]"
      >
        Me apunto!
      </Button>

      {statusMessage && (
        <p className="mt-4 text-center text-[#2A2527]">{statusMessage}</p>
      )}
    </form>
  );
}
