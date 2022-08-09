import useStorage from "./useStorage";
import { CampaignRecord } from "../types/campaign";

export default function useFetchCampaigns() {
  const { get } = useStorage();
  const fetchCampaigns = async (): Promise<CampaignRecord[]> => {
    const result = await get("campaignsIndex.json");
    return JSON.parse(result.data);
  };

  return {
    fetchCampaigns,
  };
}
