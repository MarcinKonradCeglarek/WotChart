// src/store/reducer1/action.ts

import { ActionsUnion, DispatchAction } from "../store/type";
import { createAction } from "../store/action";
import { ClanDetails } from "../model/clan";
import { PlayerDetails } from "../model/player";
import { AssociativeArray } from "../model/general";

export enum ActionTypes {
  FETCH_CLAN_DETAILS_SUCCEDED = "FETCH_CLAN_DETAILS_SUCCEDED",
  FETCH_CLAN_DETAILS_REQUESTED = "FETCH_CLAN_DETAILS_REQUESTED",
  FETCH_PLAYER_PERSONAL_DATA_REQUESTED = "FETCH_PLAYER_PERSONAL_DATA_REQUESTED",
  FETCH_PLAYER_PERSONAL_DATA_SUCCEDED = "FETCH_PLAYER_PERSONAL_DATA_SUCCEDED",
}

const applicationId = "8bebb03d8875ee331a0ae47bf5dee273";

export type FetchClanDetailsOptions = {
  clanId: number;
};

export type FetchPlayerPersonalDataOptions = {
  accountIds: number[]
}

export const Actions = {
  fetchClanDetailsRequested: (options: FetchClanDetailsOptions) => createAction(ActionTypes.FETCH_CLAN_DETAILS_REQUESTED, options),
  fetchClanDetailsSucceded: (clanDetails: ClanDetails) => createAction(ActionTypes.FETCH_CLAN_DETAILS_SUCCEDED, clanDetails),
  fetchhPlayerPersonalDataRequested: (options: FetchPlayerPersonalDataOptions) => createAction(ActionTypes.FETCH_PLAYER_PERSONAL_DATA_REQUESTED, options),
  fetchhPlayerPersonalDataSucceded: (playerDetails: AssociativeArray<PlayerDetails>) => createAction(ActionTypes.FETCH_PLAYER_PERSONAL_DATA_SUCCEDED, playerDetails),
};

export type Actions = ActionsUnion<typeof Actions>;

export function fetchClanDetailsRequested(options: FetchClanDetailsOptions): DispatchAction {
  return async dispatch => {
    dispatch(Actions.fetchClanDetailsRequested(options))
    fetch(`https://api.worldoftanks.eu/wot/clans/info/?application_id=${applicationId}&clan_id=${options.clanId}`)
      .then(response => response.json())
      .then(data => dispatch(Actions.fetchClanDetailsSucceded(data.data[options.clanId])))
      .then(data => {
        const options = { accountIds: data.payload.members.map(m => m.account_id) };
        dispatch(fetchhPlayerPersonalDataRequested(options))
      });
  };
}

function fetchhPlayerPersonalDataRequested(options: FetchPlayerPersonalDataOptions): DispatchAction {
  return async dispatch => {
    dispatch(Actions.fetchhPlayerPersonalDataRequested(options));

    fetch(`https://api.worldoftanks.eu/wot/account/info/?application_id=${applicationId}&account_id=${options.accountIds.join(',')}`)
      .then(response => response.json())
      .then(data => {
        dispatch(Actions.fetchhPlayerPersonalDataSucceded(data.data));
      });
  };
}
