import React, { ReactElement, useContext, useEffect } from "react";

import { Context } from "../context/state";

import { ActionTypes } from "../types/context";
import { Campaign } from "../types/campaign";

import Navbar from "../components/common/Navbar";

interface Props {
  children: JSX.Element;
  campaigns: Campaign[];
}

const Home = ({ children, campaigns }: Props): ReactElement<Props> => {
  const { dispatch } = useContext(Context);
  useEffect(() => {
    dispatch({
      type: ActionTypes.SET_CAMPAIGNS,
      data: campaigns,
    });
    dispatch({
      type: ActionTypes.UPDATED_LOADED_STATE,
      data: true,
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default Home;
