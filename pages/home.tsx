import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";

import useFetchCampaigns from "../hooks/useFetchCampaigns";

import { Context } from "../context/state";
import { ActionTypes } from "../types/context";

import BasePage from "../components/BasePage";
import CampaignList from "../components/campaigns/lists/CampaignList";
import Container from "../components/common/Container";

const Home: NextPage = () => {
  const { state, dispatch } = useContext(Context);
  const { fetchCampaigns } = useFetchCampaigns();
  const [campaignsLoaded, setCampaignsLoaded] = useState(false);

  useEffect(() => {
    if (!state.campaigns) {
      const fetch = async () => {
        const result = await fetchCampaigns();
        dispatch({
          type: ActionTypes.SET_CAMPAIGNS,
          data: result,
        });
        setCampaignsLoaded(true);
      };
      fetch();
    } else {
      setCampaignsLoaded(true);
    }
  }, []);
  return (
    <Container>
      <BasePage>
        <>
          {campaignsLoaded && <CampaignList />}
          {!campaignsLoaded && (
            <div className="flex items-start justify-center h-3/5">
              <div className="mr-10 h-20 flex items-center">
                <p className="text-5xl">Loading...</p>
              </div>
              <div className="ml-10 w-20 h-20 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          )}
        </>
      </BasePage>
    </Container>
  );
};

export default Home;
