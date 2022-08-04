export interface CreateCampaignFormState {
  name: string;
  campaignGoal: number;
  description: string;
}

export interface CampaignRecord extends CreateCampaignFormState {
  address: string;
}

export interface Campaign extends CreateCampaignFormState {
  bannerImage: File;
}
