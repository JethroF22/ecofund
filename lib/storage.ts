import fleekStorage from "@fleekhq/fleek-storage-js";

import { CampaignRecord } from "../types/campaign";

export const parseIndex = (value: any): CampaignRecord[] => {
  let str = "";
  for (let i = 0; i < value.length; i++) {
    str += String.fromCharCode(parseInt(value[i]));
  }

  const index = JSON.parse(str) as CampaignRecord[];
  return index;
};

export const get = async (fileKey: string) => {
  return fleekStorage.get({
    apiKey: process.env.NEXT_PUBLIC_FLEEK_STORAGE_KEY as string,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_STORAGE_SECRET as string,
    key: fileKey,
  });
};

export const fetchCampaigns = async (): Promise<CampaignRecord[]> => {
  const result = await get("campaignsIndex.json");
  return JSON.parse(result.data);
};
