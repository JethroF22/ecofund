import { useContext } from "react";

import useCampaignContract from "./useCampaignContract";

import { Context } from "../context/state";
import { ActionTypes } from "../types/context";

export default function useFetchCampaignDetails(address: string) {
  const {
    dispatch,
    state: { campaignDetails },
  } = useContext(Context);
  const { getCampaignDetails, loadContract } = useCampaignContract();

  const fetchCampaignDetails = async () => {
    if (campaignDetails[address]) {
      return campaignDetails[address];
    } else {
      try {
        loadContract(address);
        const details = await getCampaignDetails();
        dispatch({
          type: ActionTypes.SET_CAMPAIGN_DETAILS,
          data: {
            totalPledges: details.totalPledges,
            numPledges: details.numPledges,
            donators: {
              1: details.donators,
            },
            address,
          },
        });
        return details;
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return {
    fetchCampaignDetails,
  };
}
