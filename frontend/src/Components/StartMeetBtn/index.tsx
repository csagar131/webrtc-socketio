import { SocketContext } from "@/Context/SocketContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const StartMeetBtn = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const enterRoom = ({ roomId }: { roomId: string }) => {
    navigate(`/room/${roomId}`);
  };

  const handleBtnClick = () => {
    // emit create room event to server
    socket.emit("create-room");

    // received room created event on successfull room create from server
    socket.on("room-created", enterRoom);
  };

  return (
    <Button
      onClick={handleBtnClick}
      className="px-2 py-1 bg-slate-400 rounded-lg"
      variant={"destructive"}
    >
      Start Meet
    </Button>
  );
};

export default StartMeetBtn;
