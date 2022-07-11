import React from "react";
import type { NextPage } from "next";
import { useEthers } from "@usedapp/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/common/Button";
import { useRouter } from "next/router";
import Link from "next/link";

const Home: NextPage = () => {
  const { deactivate } = useEthers();
  const router = useRouter();
  const logout = () => {
    deactivate();
    router.push("/");
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-emerald-400 via-green-400 to-blue-500 flex items-start justify-center">
      <div className="w-full">
        <nav className="mx-10 my-2 flex items-center justify-between">
          <div className="w-2/5 flex items-center">
            <div className="flex items-center justify-center mr-10">
              <p className="text-2xl text-white mr-3">EcoFund</p>
              <FontAwesomeIcon icon={faSeedling} size="2x" color="white" />
            </div>
            <div className="w-3/5 flex items-center">
              <p className="text-xl text-white mr-10 hover:underline">
                <Link href="/create">Create Campaign</Link>
              </p>
              <p className="text-xl text-white mr-10 hover:underline">
                <Link href="/browse">Browse Campaigns</Link>
              </p>
            </div>
          </div>
          <Button onClick={logout} text="Disconnect" />
        </nav>
        <hr />
      </div>
    </div>
  );
};

export default Home;
