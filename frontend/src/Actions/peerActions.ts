import { PeerAction } from "@/Reducers/peerReducer";

export const ADD_PEER = "ADD_PEER";
export const REMOVE_PEER = "REMOVE_PEER";

export const addPeerAction = (
  peerId: string,
  stream: MediaStream
): PeerAction => ({
  type: ADD_PEER,
  payload: { peerId, stream },
});

export const removePeerAction = (peerId: string): PeerAction => ({
  type: REMOVE_PEER,
  payload: { peerId },
});
