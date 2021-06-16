import { Actions } from "../store/type";

import { ActionTypes } from "./action";

export type Reducer1State = {
  foo?: string;
};

const initialState: Readonly<Reducer1State> = {};

export function reducer(
  state: Reducer1State = initialState,
  action: Actions
): Reducer1State {
  switch (action.type) {
    case ActionTypes.Action1: {
      const { foo } = action.payload;
      return { foo };
    }
    case ActionTypes.Action2:
      return { ...initialState };
    default:
      return state;
  }
}