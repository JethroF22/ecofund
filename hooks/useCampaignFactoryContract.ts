import { useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";

import CampaignFactoryConfig from "../config/campaignFactory";
import { Campaign } from "../types/campaign";

export default function useCampaignFactoryContract() {
  const { account, library } = useEthers();
  const { abi, address } = CampaignFactoryConfig;
  const signer = library?.getSigner();
  const campaignFactoryContract = new Contract(
    address[process.env.ENVIRONMENT || "localnet"],
    abi,
    signer
  );
  const createCampaign = async (campaign: Campaign) => {
    return campaignFactoryContract.createCampaign(
      campaign.campaignGoal,
      account
    );
  };

  return {
    createCampaign,
    campaignFactoryContract,
  };
}
