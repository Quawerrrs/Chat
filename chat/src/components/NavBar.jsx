import React from "react";

export const NavBar = ({ username }) => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <h1 className="text-xl">Chat Application</h1>
      <div className="text-right">
        <span>
          {username ? `Connecté en tant que ${username}` : "Non connecté"}
        </span>
      </div>
    </nav>
  );
};
