import { Dispatch } from "react";

import { CampaignRecord } from "./campaign";

export interface AppContext {
  dispatch: Dispatch<ContextUpdateAction>;
  state: AppContextState;
}

export interface AppContextState {
  campaigns: CampaignRecord[] | null;
}

export enum ActionTypes {
  ADD_CAMPAIGN = "ADD_CAMPAIGN",
  SET_CAMPAIGNS = "SET_CAMPAIGNS",
}

export interface ContextUpdateAction {
  type: ActionTypes;
  data?: any;
}
