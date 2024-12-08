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
          <Label className="text-[#2A2527]">Alojamiento</Label>
          <RadioGroup
            value={accommodation}
            onValueChange={setAccommodation}
            className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-2"
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
                Colchoneta
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="nights" className="text-[#2A2527]">
            Número de noches
          </Label>
          <select
            id="nights"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
            className="w-full bg-[#F5F0E8] text-[#2A2527] border border-[#2A2527] rounded-md p-2"
          >
            <option value="1">Una noche</option>
            <option value="2">Dos noches</option>
          </select>
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
