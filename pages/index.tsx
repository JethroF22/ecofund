import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEthers } from "@usedapp/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/common/Button";

const Landing: NextPage = () => {
  const { activateBrowserWallet, account } = useEthers();
  const router = useRouter();
  const openApp = () => {
    if (!account) {
      activateBrowserWallet();
    }
    router.push("/home");
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-emerald-400 via-green-400 to-blue-500 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-3/6 h-2/5 m-auto ">
        <div className="flex items-center justify-center mb-8">
          <p className="text-6xl text-white mr-10">EcoFund</p>
          <FontAwesomeIcon icon={faSeedling} size="4x" color="white" />
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={openApp} text="Open App" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
