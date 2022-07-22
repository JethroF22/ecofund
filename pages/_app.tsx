import React from "react";
import type { AppProps } from "next/app";
import { DAppProvider } from "@usedapp/core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import "../styles/globals.css";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider
      config={{
        multicallAddresses: {
          "1337": "0xE9C09Cc1e780cfa90279eB23c3a1558Be71021ED",
          "80001": "0xE9C09Cc1e780cfa90279eB23c3a1558Be71021ED",
        },
      }}
    >
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
