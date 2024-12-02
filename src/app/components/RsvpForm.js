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

    const data = { name, guests, accommodation };

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
        setAccommodation("tienda");
      } else {
        setStatusMessage("Error al guardar RSVP: " + result.message);
      }
    } catch (error) {
      setStatusMessage("Error al enviar la solicitud: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-[#FFB7D5] p-6 rounded-lg shadow-lg"
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
            className="flex flex-wrap gap-2 md:space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tienda" id="tienda" className="h-6" />
              <Label htmlFor="tienda" className="text-[#2A2527]">
                Tienda
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="furgoneta"
                id="furgoneta"
                className="h-6"
              />
              <Label htmlFor="furgoneta" className="text-[#2A2527]">
                Furgoneta
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="colchoneta"
                id="colchoneta"
                className="h-6"
              />
              <Label htmlFor="colchoneta" className="text-[#2A2527]">
                Colchoneta
              </Label>
            </div>
          </RadioGroup>
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
