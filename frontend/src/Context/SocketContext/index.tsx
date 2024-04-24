import { createContext } from "react";
import SocketIoClient from "socket.io-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any>(null);

const WS_Server = "http://localhost:5500";

const socket = SocketIoClient(WS_Server);

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
