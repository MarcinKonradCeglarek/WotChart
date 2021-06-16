import { createSelector } from "reselect";

import { State } from "../store/type";

import { Reducer1State as ClanReducerState } from "./reducer";

export function selectReducer1State(state: State): ClanReducerState {
  return state.clanReducer;
}

export const selectFoo = createSelector(
  selectReducer1State,
  state => state.foo
);