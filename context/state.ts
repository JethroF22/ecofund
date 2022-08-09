import { createContext } from "react";

import { AppContext, AppContextState } from "../types/context";

export const Context = createContext<AppContext>({
  dispatch: () => null,
  state: {} as AppContextState,
});
