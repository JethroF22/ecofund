import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEthers } from "@usedapp/core";

import useFetchCampaignDetails from "../../hooks/useFetchCampaignDetails";

import { fetchCampaigns } from "../../lib/storage";

import { Campaign, CampaignContractDetails } from "../../types/campaign";

import Container from "../../components/common/Container";
import BasePage from "../../components/BasePage";
import CampaignDetails from "../../components/campaigns/display/CampaignDetails";

interface Props {
  campaigns: Campaign[];
  campaign: Campaign;
}

const CampaignDetailsPage: NextPage = ({ campaigns, campaign }: Props) => {
  const {
    query: { campaignAddress },
  } = useRouter();
  const { library, account } = useEthers();
  const { fetchCampaignDetails } = useFetchCampaignDetails(
    campaignAddress as string
  );
  const [campaignDetails, setCampaignDetails] =
    useState<CampaignContractDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (library && campaignAddress) {
      const load = async () => {
        setIsLoading(true);
        const campaignDetails = await fetchCampaignDetails();
        setCampaignDetails(campaignDetails);
        setIsLoading(false);
      };
      load();
    }
  }, [library, campaignAddress]);

  return (
    <Container>
      <BasePage campaigns={campaigns}>
        <CampaignDetails
          address={campaignAddress as string}
          campaign={campaign}
          campaignDetails={campaignDetails as CampaignContractDetails}
          isLoading={isLoading}
          currentUser={account as string}
        />
      </BasePage>
    </Container>
  );
};

export default CampaignDetailsPage;

export async function getServerSideProps({ query: { campaignAddress } }) {
  const campaigns = await fetchCampaigns();
  const campaign = campaigns.find(
    (campaign) => campaign.address === campaignAddress
  ) as Campaign;
  return { props: { campaigns, campaign } };
}
