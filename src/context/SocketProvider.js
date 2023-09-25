import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSocketID } from "./SocketIDProvider";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useParams } from "react-router-dom";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  //const { socketID } = useSocketID();

  const user = useSelector(selectCurrentUser);
  console.log(socket);
  useEffect(() => {
    if (!user) return;
    const newSocket = io("http://localhost:3500", {
      query: { user },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
