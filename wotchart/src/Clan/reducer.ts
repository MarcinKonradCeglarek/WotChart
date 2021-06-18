import { Actions } from "../store/type";

import { ActionTypes } from "./action";
import { ClanDetails } from "../model/clan";

export type Reducer1State = {
  isLoading: boolean;
  clanDetails?: ClanDetails;
};

const initialState: Readonly<Reducer1State> = {
    isLoading: false,
    clanDetails: undefined
};

export function reducer(
  state: Reducer1State = initialState,
  action: Actions
): Reducer1State {
  switch (action.type) {
    case ActionTypes.FETCH_CLAN_DETAILS_SUCCEDED: {
      return { ...state, clanDetails: action.payload, isLoading: false };
    }
    case ActionTypes.FETCH_CLAN_DETAILS_REQUESTED:
      return { ...state, isLoading: true }
    default:
      return state;
  }
}