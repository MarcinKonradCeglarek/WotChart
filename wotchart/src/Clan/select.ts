import { createSelector } from "reselect";

import { State } from "../store/type";

import { Reducer1State as ClanReducerState } from "./reducer";

export function selectClanReducerState(state: State): ClanReducerState {
    return state.clanReducer;
}

export const seletClanDetails = createSelector(
    selectClanReducerState,
    state => state.clanDetails
);

export const selectPlayers = createSelector(
    selectClanReducerState,
    state => state.players
)
