import React, { useContext, useState } from "react";

const SocketIDContext = React.createContext();

export function useSocketID() {
  return useContext(SocketIDContext);
}

export function SocketIDProvider({ children }) {
  const [socketID, setSocketID] = useState(null);
  return (
    <SocketIDContext.Provider value={{ socketID, setSocketID }}>
      {children}
    </SocketIDContext.Provider>
  );
}
