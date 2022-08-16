export interface CreateCampaignFormState {
  name: string;
  campaignGoal: number;
  description: string;
}

export interface Campaign extends CreateCampaignFormState {
  address: string;
  bannerImage: string;
  deadline: number;
  creator: string;
  creationDate: Date;
}

export interface CampaignContractDetails {
  donators: string[];
  numPledges: number;
  totalPledges: number;
}

export interface Donators {
  [key: number]: string[];
}

export interface CampaignUpload extends CreateCampaignFormState {
  bannerImage: File;
  deadline: number;
}
