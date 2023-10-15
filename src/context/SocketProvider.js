import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { selectCurrentUser } from "../features/auth/authSlice";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    if (!user) return;
    const newSocket = io("http://localhost:3500", {
      query: {
        user,
      },
    });
    setSocket(newSocket);
  }, [user]);

  useEffect(() => {
    return () => {
      if (!socket) return;

      console.log(socket);
      socket.close();
    };
  }, [socket]);
  console.log(socket);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
