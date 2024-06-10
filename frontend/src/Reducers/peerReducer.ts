import { ADD_PEER, REMOVE_PEER } from "@/Actions/peerActions";

export type PeerState = Record<string, { stream: MediaStream }>;

export type PeerAction =
  | {
      type: typeof ADD_PEER;
      payload: { peerId: string; stream: MediaStream };
    }
  | {
      type: typeof REMOVE_PEER;
      payload: { peerId: string };
    };

export const peerReducer = (state: PeerState, action: PeerAction) => {
  switch (action.type) {
    case ADD_PEER:
      return {
        ...state,
        [action.payload.peerId]: {
          stream: action.payload.stream,
        },
      };

    case REMOVE_PEER: {
      const newState: PeerState = {};
      Object.entries(state).forEach(([key, val]) => {
        if (key !== action.payload.peerId) {
          newState[key] = val;
        }
      });
      return newState;
    }
    // case REMOVE_PEER:
    //   const newPeers = { ...state.peers };
    //   delete newPeers[action.payload.peerId];
    //   return {
    //     ...state,
    //     peers: newPeers,
    //   };
    default:
      return { ...state };
  }
};
