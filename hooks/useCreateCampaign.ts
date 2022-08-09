import useCampaignFactoryContract from "./useCampaignFactoryContract";
import useStorage from "./useStorage";
import { Campaign, CampaignRecord } from "../types/campaign";

export default function useCreateCampaign() {
  const { createCampaign } = useCampaignFactoryContract();
  const { upload } = useStorage();

  const createNewCampaign = async (
    campaign: Campaign,
    campaigns: CampaignRecord[]
  ) => {
    console.log("creating campaign");
    const transaction = await createCampaign(campaign);
    const result = await transaction.wait();
    const campaignAddress = result.events[0].args[0];
    console.log("created campaign at", campaignAddress);
    console.log("uploading banner image");
    const uploadedFile = await upload(`${campaign.name}`, campaign.bannerImage);
    const campaignRecord: CampaignRecord = {
      name: campaign.name,
      campaignGoal: campaign.campaignGoal,
      description: campaign.description,
      address: campaignAddress,
      deadline: campaign.deadline,
      bannerImage: uploadedFile.publicUrl,
    };
    console.log("updating index");
    campaigns.push(campaignRecord);
    await upload("campaignsIndex.json", JSON.stringify(campaigns));
    console.log("wrote campaign data to IPFS");

    return campaignRecord;
  };

  return {
    createNewCampaign,
  };
}
