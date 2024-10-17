import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { NavBar } from "./components/NavBar";
import { Events } from "./components/Events";
import { MyForm } from "./components/MyForm";

export default function App() {
  const [fooEvents, setFooEvents] = useState(() => {
    const savedEvents = localStorage.getItem("chatMessages");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  const [showPopup, setShowPopup] = useState(!username);

  useEffect(() => {
    function onFooEvent(value) {
      setFooEvents((previous) => {
        const updatedEvents = [...previous, value];
        localStorage.setItem("chatMessages", JSON.stringify(updatedEvents));
        return updatedEvents;
      });
    }

    socket.on("foo", onFooEvent);

    return () => {
      socket.off("foo", onFooEvent);
    };
  }, []);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    socket.emit("setUsername", username);
    localStorage.setItem("username", username);
    setShowPopup(false);
  };

  return (
    <div className="App flex flex-col h-screen">
      <NavBar username={username} />

      {/* Conteneur pour les messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <Events events={fooEvents} />
      </div>

      {/* Popup pour le pseudo */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg">Entrez votre pseudo</h2>
            <form onSubmit={handleUsernameSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Votre pseudo"
                className="border p-2 w-full"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 mt-2 rounded"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Formulaire d'envoi de message */}
      <div className="flex items-center p-4 border-t">
        <MyForm />
      </div>
    </div>
  );
}
