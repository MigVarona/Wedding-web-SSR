"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";


const GuestBookForm = ({ onNewMessage }) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message || !name) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        alert("¡Gracias por tu mensaje!");
        setMessage(""); // Limpiar campo de mensaje
        setName(""); // Limpiar campo de nombre
        onNewMessage(newMessage); // Llamar a la función para actualizar los mensajes en el componente principal
      } else {
        alert("Hubo un error al enviar tu mensaje.");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar tu mensaje.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-[#FFB7D5] p-4 rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-[#F5F0E8]">Deja un mensaje en el libro de visitas</h3>
      <div className="mb-4">
        <label htmlFor="name" className="block text-[#F5F0E8]">Tu nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mt-2 bg-white rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-[#F5F0E8]">Tu mensaje:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 mt-2 bg-white rounded"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full mt-6 bg-[#ffce1e] text-[#2A2527] hover:bg-[#ffd84e]"
      >
        Enviar!
      </Button>
    </form>
  );
};

export default GuestBookForm;
