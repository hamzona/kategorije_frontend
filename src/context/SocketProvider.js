import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  //const user = useSelector(selectCurrentUser);
  //console.log(socket);

  useEffect(() => {
    const newSocket = io("https://kategorije-backend.onrender.com");
    setSocket(newSocket);

    // return () => socket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
