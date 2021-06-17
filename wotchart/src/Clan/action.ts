// src/store/reducer1/action.ts

import { ActionsUnion, DispatchAction } from "../store/type";
import { createAction } from "../store/action";
import { ClanDetails } from "./models";

export enum ActionTypes {
  FETCH_CLAN_DETAILS_SUCCEDED = "FETCH_CLAN_DETAILS_SUCCEDED",
  FETCH_CLAN_DETAILS_REQUESTED = "FETCH_CLAN_DETAILS_REQUESTED"
}

export type FetchClanDetailsOptions = {
  clanId: number;
};

export const Actions = {
  fetchClanDetailsRequested: (options: FetchClanDetailsOptions) => createAction(ActionTypes.FETCH_CLAN_DETAILS_REQUESTED, options),
  fetchClanDetailsSucceded: (data: ClanDetails) => createAction(ActionTypes.FETCH_CLAN_DETAILS_SUCCEDED, data)
};

export type Actions = ActionsUnion<typeof Actions>;

export function fetchClanDetailsRequested(options: FetchClanDetailsOptions): DispatchAction {
  return async dispatch => {
    const applicationId = "8bebb03d8875ee331a0ae47bf5dee273";
    fetch(`https://api.worldoftanks.eu/wot/clans/info/?application_id=${applicationId}&clan_id=${options.clanId}`)
      .then(response => response.json())
      .then(data => dispatch(Actions.fetchClanDetailsSucceded(data.data)));
  };
}
// export function action2(): DispatchAction {
//   return async dispatch => {
//     const response = await fetch("https://example.com"); 
//     dispatch(Actions.action2());
//   };
// }