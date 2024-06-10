import { ADD_PEER, addPeerAction } from "@/Actions/peerActions";
import VideoFeedPlayer from "@/Components/VideoFeedPlayer";
import { SocketContext } from "@/Context/SocketContext";
import { peerReducer } from "@/Reducers/peerReducer";
import { MediaConnection } from "peerjs";
import { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  const { id } = useParams();
  const { socket, user } = useContext(SocketContext);

  const [stream, setStream] = useState<MediaStream>();

  const [peers, dispatch] = useReducer(peerReducer, {});

  const getUserslist = ({
    roomId,
    participants,
  }: {
    roomId: string;
    participants: string[];
  }) => {
    console.log(roomId, participants);
  };

  const getUserFeed = async () => {
    const capturingStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(capturingStream);
  };

  useEffect(() => {
    if (user) {
      socket.emit("joined-room", { roomId: id, peerId: user._id });
      socket.on("get-users", getUserslist);
      getUserFeed();
    }
  }, [socket, user, id]);

  useEffect(() => {
    if (!user || !stream) return;

    socket.on("user-joined", ({ peerId }: { peerId: string }) => {
      const call = user.call(peerId, stream);

      call.on("stream", () => {
        dispatch(addPeerAction(peerId, stream));
        dispatch({
          type: ADD_PEER,
          payload: { peerId, stream },
        });
      });
    });

    user.on("call", (call: MediaConnection) => {
      // Answer the call with the stream
      call.answer(stream);

      // Listen for the remote stream
      call.on("stream", (remoteStream: MediaStream) => {
        dispatch(addPeerAction(call.peer, remoteStream));
      });
    });

    socket.emit("ready");
  }, [user, stream, socket]);

  return (
    <div>
      <VideoFeedPlayer stream={stream} />
      <div>Other users feed</div>
      {Object.keys(peers).map((peerId) => {
        return <VideoFeedPlayer key={peerId} stream={peers[peerId].stream} />;
      })}
    </div>
  );
};

export default Room;
