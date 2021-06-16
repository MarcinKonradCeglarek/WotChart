import { combineReducers, Reducer } from "redux";

import { Actions, State } from "./type";
import { reducer as clanReducer } from "../clan";

export const reducer: Reducer<State, Actions> = combineReducers({ clanReducer });