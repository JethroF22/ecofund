import fleekStorage from "@fleekhq/fleek-storage-js";

import useCampaignFactoryContract from "./useCampaignFactoryContract";
import { Campaign, CampaignRecord } from "../types/campaign";

export default function useCreateCampaign() {
  const { createCampaign } = useCampaignFactoryContract();

  const createNewCampaign = async (campaign: Campaign) => {
    console.log("creating campaign");
    const transaction = await createCampaign(campaign);
    const result = await transaction.wait();
    const campaignAddress = result.events[0].args[0];
    console.log("created campaign at", campaignAddress);
    console.log("uploading banner image");
    const uploadedFile = await fleekStorage.upload({
      apiKey: process.env.NEXT_PUBLIC_FLEEK_STORAGE_KEY as string,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_STORAGE_SECRET as string,
      key: campaign.name,
      data: campaign.bannerImage,
      httpUploadProgressCallback: (event) => {
        console.log(Math.round((event.loaded / event.total) * 100) + "% done");
      },
    });
    const index = await fleekStorage.get({
      apiKey: process.env.NEXT_PUBLIC_FLEEK_STORAGE_KEY as string,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_STORAGE_SECRET as string,
      key: "campaignsIndex.json",
    });
    const parsedIndex: CampaignRecord[] = JSON.parse(index.data);
    const campaignRecord: CampaignRecord = {
      name: campaign.name,
      campaignGoal: campaign.campaignGoal,
      description: campaign.description,
      address: campaignAddress,
      bannerImage: uploadedFile.publicUrl,
    };
    parsedIndex.push(campaignRecord);
    console.log("upating index");
    await fleekStorage.upload({
      apiKey: process.env.NEXT_PUBLIC_FLEEK_STORAGE_KEY as string,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_STORAGE_SECRET as string,
      key: "campaignsIndex.json",
      data: JSON.stringify(parsedIndex),
      httpUploadProgressCallback: (event) => {
        console.log(Math.round((event.loaded / event.total) * 100) + "% done");
      },
    });
    console.log("wrote campaign data to IPFS");

    return {
      name: campaign.name,
      campaignGoal: campaign.campaignGoal,
      description: campaign.description,
      address: campaignAddress,
      bannerImage: uploadedFile.publicUrl,
    };
  };

  return {
    createNewCampaign,
  };
}
