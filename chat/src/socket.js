// src/socket.js
import { io } from "socket.io-client";

export const socket = io("http://localhost:4000"); // Assurez-vous que l'URL est correcte
