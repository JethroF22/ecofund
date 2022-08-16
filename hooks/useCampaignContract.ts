import { useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";

import CampaignConfig from "../config/campaign";

export default function useCampaignContract() {
  const { library } = useEthers();
  let campaignContract: Contract;
  const loadContract = (contractAddress: string) => {
    const { abi } = CampaignConfig;
    const signer = library?.getSigner();
    campaignContract = new Contract(contractAddress, abi, signer);

    return campaignContract;
  };

  const getCampaignDetails = async () => {
    const totalPledges = await campaignContract.totalPledges();
    const numPledges = await campaignContract.numPledges();
    const campaignGoal = await campaignContract.campaignGoal();
    const donators = await campaignContract.getPaginatedDonators(1);

    return {
      totalPledges: totalPledges.toNumber(),
      numPledges: numPledges.toNumber(),
      campaignGoal: campaignGoal.toNumber(),
      donators: donators,
    };
  };

  const getPaginatedDonators = async (
    pageNumber: number
  ): Promise<string[]> => {
    return campaignContract.getPaginatedDonators(pageNumber);
  };

  return {
    getCampaignDetails,
    getPaginatedDonators,
    loadContract,
  };
}
