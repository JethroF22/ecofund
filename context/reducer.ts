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
    default:
      return state;
  }
};
