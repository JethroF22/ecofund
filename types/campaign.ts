export interface CreateCampaignFormState {
  name: string;
  campaignGoal: number;
  description: string;
}

export interface CampaignRecord extends CreateCampaignFormState {
  address: string;
  bannerImage: string;
  deadline: number;
}

export interface Campaign extends CreateCampaignFormState {
  bannerImage: File;
  deadline: number;
}
