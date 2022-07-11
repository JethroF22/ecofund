import React from "react";
import type { AppProps } from "next/app";
import { DAppProvider } from "@usedapp/core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import "../styles/globals.css";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={{}}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
