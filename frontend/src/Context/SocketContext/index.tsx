import Peer from "peerjs";
import { createContext, useEffect, useState } from "react";
import SocketIoClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any>(null);

const WS_Server = "http://localhost:6969";

const socket = SocketIoClient(WS_Server);

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<Peer>();

  useEffect(() => {
    const userId = uuidv4();
    const newPeer = new Peer(userId, {
      host: "localhost",
      port: 9000,
      path: "/myapp",
    });
    setUser(newPeer);
  }, []);

  return (
    <SocketContext.Provider value={{ socket, user }}>
      {children}
    </SocketContext.Provider>
  );
};
