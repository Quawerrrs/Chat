// src/components/ConnectionState.jsx
import React from "react";

export const ConnectionState = ({ isConnected }) => {
  return (
    <div
      className={`p-4 ${
        isConnected ? "bg-green-100" : "bg-red-100"
      } rounded-lg`}
    >
      {isConnected ? "Connecté" : "Déconnecté"}
    </div>
  );
};
