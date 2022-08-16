import { Dispatch } from "react";

import { Campaign, CampaignContractDetails } from "./campaign";

export interface AppContext {
  dispatch: Dispatch<ContextUpdateAction>;
  state: AppContextState;
}

export interface AppContextState {
  campaigns: Campaign[];
  isLoaded: boolean;
  campaignDetails: CampaignContractState;
}

export interface CampaignContractState {
  [key: string]: CampaignContractDetails;
}

export enum ActionTypes {
  ADD_CAMPAIGN = "ADD_CAMPAIGN",
  SET_CAMPAIGNS = "SET_CAMPAIGNS",
  SET_CAMPAIGN_DETAILS = "SET_CAMPAIGN_DETAILS",
  UPDATED_LOADED_STATE = "UPDATED_LOADED_STATE",
}

export interface ContextUpdateAction {
  type: ActionTypes;
  data?: any;
}
