import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEthers } from "@usedapp/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

import Container from "../components/common/Container";
import Button from "../components/common/Button";

const Landing: NextPage = () => {
  const { activateBrowserWallet, account } = useEthers();
  const router = useRouter();
  const openApp = () => {
    if (!account) {
      activateBrowserWallet();
    }
    router.replace("/home");
  };
  return (
    <Container>
      <div className="bg-gradient-to-br from-emerald-400 via-green-400 to-blue-500 flex flex-col items-center justify-center w-3/6 h-2/5 m-auto ">
        <div className="flex items-center justify-center mb-8">
          <p className="text-6xl text-white mr-10">EcoFund</p>
          <FontAwesomeIcon icon={faSeedling} size="4x" color="white" />
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={openApp}>
            <p>Open App</p>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Landing;
