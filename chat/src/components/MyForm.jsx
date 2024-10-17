import React, { useState } from "react";
import { socket } from "../socket";

export const MyForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Émettre le message au serveur
      socket.emit("foo", { message }); // Envoie le message
      setMessage(""); // Réinitialiser le champ de message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Entrez votre message"
        className="border p-2 flex-grow"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 ml-2 rounded">
        Envoyer
      </button>
    </form>
  );
};
