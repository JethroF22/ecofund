import useTextile from "./useTextile";
import useCampaignFactoryContract from "./useCampaignFactoryContract";
import { Campaign } from "../types/campaign";

export default function useCreateCampaign() {
  const { createCampaign } = useCampaignFactoryContract();
  const { getBuckets, getCampaignsBucket, getCampaignIndex } = useTextile();

  const createNewCampaign = async (campaign: Campaign) => {
    console.log("creating campaign");
    const transaction = await createCampaign(campaign);
    const result = await transaction.wait();
    const campaignAddress = result.events[0].args[0];
    console.log("created campaign at", campaignAddress);
    console.log("writing to IPFS");
    const buckets = await getBuckets();
    const key = await getCampaignsBucket(buckets);
    const index = await getCampaignIndex(buckets, key);
    await buckets.pushPath(
      key,
      `${campaign.name}`,
      campaign.bannerImage.stream()
    );
    index.push({
      name: campaign.name,
      campaignGoal: campaign.campaignGoal,
      description: campaign.description,
      address: campaignAddress,
    });
    const buffer = Buffer.from(JSON.stringify(index));
    await buckets.pushPath(key, `index.json`, buffer);
    console.log("wrote campaign data to IPFS");
  };

  return {
    createNewCampaign,
  };
}
