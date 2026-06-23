
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

export const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        const handleConnect = () => {
            console.log('Connected to server');
        };

        const handleDisconnect = () => {
            console.log('Disconnected from server');
        };

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
        };

    }, []);



    return (
        <SocketContext.Provider
            value={{
                socket,
                sendMessage: (eventName, payload) => socket.emit(eventName, payload),
                receiveMessage: (eventName, handler) => {
                    socket.on(eventName, handler);
                    return () => socket.off(eventName, handler);
                },
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
