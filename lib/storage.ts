import { CampaignRecord } from "../types/campaign";

export const parseIndex = (value: any): CampaignRecord[] => {
  let str = "";
  for (let i = 0; i < value.length; i++) {
    str += String.fromCharCode(parseInt(value[i]));
  }

  const index = JSON.parse(str) as CampaignRecord[];
  return index;
};
