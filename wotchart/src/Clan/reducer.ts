import { Actions } from "../store/type";

import { ActionTypes } from "./action";
import { ClanDetails } from "../model/clan";
import { PlayerDetails } from "../model/player";
import { AssociativeArray } from "../model/general";

export type Reducer1State = {
  isClanLoading: boolean;
  isPlayersLoading: boolean;
  clanDetails?: ClanDetails;
  players?: AssociativeArray<PlayerDetails>;
};

const initialState: Readonly<Reducer1State> = {
    isClanLoading: false,
    isPlayersLoading: false,
    clanDetails: undefined,
    players: undefined
};

export function reducer(
  state: Reducer1State = initialState,
  action: Actions
): Reducer1State {
  switch (action.type) {
    case ActionTypes.FETCH_CLAN_DETAILS_SUCCEDED: {
      return { ...state, clanDetails: action.payload, isClanLoading: false };
    }
    case ActionTypes.FETCH_CLAN_DETAILS_REQUESTED:
      return { ...state, isClanLoading: true }
    case ActionTypes.FETCH_PLAYER_PERSONAL_DATA_REQUESTED: {
      return { ...state, isPlayersLoading: true }
    }
    case ActionTypes.FETCH_PLAYER_PERSONAL_DATA_SUCCEDED: {
        return { ...state, players: action.payload, isPlayersLoading: false}
    }
    default:
      return state;
  }
}