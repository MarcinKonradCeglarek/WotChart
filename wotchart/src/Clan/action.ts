// src/store/reducer1/action.ts

import { ActionsUnion, DispatchAction } from "../store/type";
import { createAction } from "../store/action";

export enum ActionTypes {
  Action1 = "Action1",
  Action2 = "Action2"
}

export type Action1Options = {
  foo: string;
};

export const Actions = {
  action1: (options: Action1Options) =>
    createAction(ActionTypes.Action1, options),
  action2: () => createAction(ActionTypes.Action2)
};

export type Actions = ActionsUnion<typeof Actions>;

export function action1(options: Action1Options): DispatchAction {
  return async dispatch => {
    dispatch(Actions.action1(options));
  };
}
export function action2(): DispatchAction {
  return async dispatch => {
    const response = await fetch("https://example.com"); 
    dispatch(Actions.action2());
  };
}