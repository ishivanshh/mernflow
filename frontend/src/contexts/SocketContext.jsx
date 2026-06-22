import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = import.meta.env.VITE_BASE_URL;

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      autoConnect: true,
      transports: ["websocket", "polling"]
    });

    const s = socketRef.current;
    s.on("connect", () => console.log("Socket connected:", s.id));
    s.on("disconnect", (reason) => console.log("Socket disconnected:", reason));
    s.on("connect_error", (err) => console.error("Socket connect_error:", err));

    return () => {
      if (s) {
        s.off();
        s.disconnect();
      }
    };
  }, []);

  const sendMessage = (eventName, payload) => {
    const s = socketRef.current;
    if (!s) {
      console.warn("Socket not initialized. Call initialize or wait for connection.");
      return false;
    }
    s.emit(eventName, payload);
    return true;
  };

  const receiveMessage = (eventName, handler) => {
    const s = socketRef.current;
    if (!s) {
      console.warn("Socket not initialized. Handler not attached.");
      return () => {};
    }
    s.on(eventName, handler);
    return () => s.off(eventName, handler);
  };

  const value = {
    sendMessage,
    receiveMessage,
    getSocket: () => socketRef.current
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export default SocketContext;
 