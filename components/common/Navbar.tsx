import React from "react";
import { useEthers } from "@usedapp/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  const { deactivate } = useEthers();
  const router = useRouter();
  const logout = () => {
    deactivate();
    router.replace("/");
  };
  return (
    <div className="w-full bg-gradient-to-r from-blue-400 via-green-400 to-emerald-500">
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
        <Button onClick={logout}>
          <p>Disconnect</p>
        </Button>
      </nav>
      <hr />
    </div>
  );
}

export default Navbar;
