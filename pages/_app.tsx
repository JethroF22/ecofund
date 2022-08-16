import React, { useReducer } from "react";
import type { AppProps } from "next/app";
import { DAppProvider } from "@usedapp/core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import "../styles/globals.css";

import { Context } from "../context/state";
import { appContextReducer } from "../context/reducer";
import { AppContextState } from "../types/context";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(appContextReducer, {
    campaigns: [],
    isLoaded: false,
    campaignDetails: {},
  } as AppContextState);
  return (
    <DAppProvider
      config={{
        multicallAddresses: {
          "1337": "0xE9C09Cc1e780cfa90279eB23c3a1558Be71021ED",
          "80001": "0xE9C09Cc1e780cfa90279eB23c3a1558Be71021ED",
        },
      }}
    >
      <Context.Provider value={{ state, dispatch }}>
        <Component {...pageProps} />
      </Context.Provider>
    </DAppProvider>
  );
}

export default MyApp;
