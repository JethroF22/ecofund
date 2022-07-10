import React from "react";
import type { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-emerald-400 via-green-400 to-blue-500 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-3/6 h-2/5 m-auto ">
        <div className="flex items-center justify-center mb-8">
          <p className="text-6xl text-white mr-10">EcoFund</p>
          <FontAwesomeIcon icon={faSeedling} size="4x" color="white" />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-pink-500 hover:to-yellow-500 rounded py-3 px-5"
            onClick={() => console.log("Opening...")}
          >
            Open App
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
