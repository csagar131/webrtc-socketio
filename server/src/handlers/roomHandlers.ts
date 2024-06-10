import { Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';
import IRoomParams from '../interfaces/IRoomParams';

const rooms: Record<string, string[]> = {};

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = uuid();
    socket.join(roomId);
    socket.emit('room-created', { roomId });
    rooms[roomId] = [];
  };

  const joinRoom = ({ peerId, roomId }: IRoomParams) => {
    if (rooms[roomId]) {
      rooms[roomId].push(peerId);
      socket.join(roomId);

      // new user joins the room

      socket.on('ready', () => {
        socket.to(roomId).emit('user-joined', { peerId });
      });

      socket.emit('get-users', {
        roomId,
        participants: rooms[roomId],
      });
    }
  };

  socket.on('joined-room', joinRoom);
  socket.on('create-room', createRoom);
};
