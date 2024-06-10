import { SocketContext } from "@/Context/SocketContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const StartMeetBtn = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log(roomId, "roomId");
    navigate(`/room/${roomId}`);
  };

  const handleBtnClick = () => {
    socket.emit("create-room");
    socket.on("room-created", enterRoom);
  };

  return (
    <button
      onClick={handleBtnClick}
      className="px-2 py-1 bg-slate-400 rounded-lg"
    >
      Start Meet
    </button>
  );
};

export default StartMeetBtn;
