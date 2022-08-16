import {
  AppContextState,
  ContextUpdateAction,
  ActionTypes,
} from "../types/context";

export const appContextReducer = (
  state: AppContextState,
  action: ContextUpdateAction
) => {
  switch (action.type) {
    case ActionTypes.ADD_CAMPAIGN:
      return {
        ...state,
        campaigns: [...state.campaigns, action.data],
      };
    case ActionTypes.SET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.data,
      };
    case ActionTypes.SET_CAMPAIGN_DETAILS:
      return {
        ...state,
        campaignDetails: {
          ...state.campaignDetails,
          [action.data.address]: {
            totalPledges: action.data.totalPledges,
            numPledges: action.data.numPledges,
            campaignGoal: action.data.campaignGoal,
            donators: action.data.donators,
          },
        },
      };
    case ActionTypes.UPDATED_LOADED_STATE:
      return {
        ...state,
        isLoaded: action.data,
      };
    default:
      return state;
  }
};
