import * as Yup from "yup";

export const createCampaignValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a campaign name"),
  description: Yup.string().required("Please enter a description"),
  campaignGoal: Yup.number().required("Please enter a description").min(1),
});
