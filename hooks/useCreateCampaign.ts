import { Buckets } from "@textile/hub";

import useCampaignFactoryContract from "./useCampaignFactoryContract";
import { Campaign } from "../types/campaign";

export default function useCreateCampaign() {
  const { createCampaign } = useCampaignFactoryContract();

  const createNewCampaign = async (campaign: Campaign) => {
    const transaction = await createCampaign(campaign);
    await transaction.wait();
    const buckets = await Buckets.withKeyInfo({
      key: process.env.NEXT_PUBLIC_HUB_API_KEY as string,
      secret: process.env.NEXT_PUBLIC_HUB_API_SECRET as string,
    });
    const { root } = await buckets.getOrCreate("ecofund-campaigns", {
      encrypted: false,
    });

    if (!root) throw new Error("bucket not created");
    const bucketKey = root.key;
    await buckets.pushPath(
      bucketKey,
      `ecofund-campaigns/${campaign.name}/${campaign.bannerImage.name}`,
      campaign.bannerImage.stream()
    );
    const buffer = Buffer.from(
      JSON.stringify({
        name: campaign.name,
        campaignGoal: campaign.campaignGoal,
        description: campaign.description,
      })
    );
    await buckets.pushPath(
      bucketKey,
      `ecofund-campaigns/${campaign.name}/details.json`,
      buffer
    );
  };

  return {
    createNewCampaign,
  };
}
