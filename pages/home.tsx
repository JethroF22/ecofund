import React from "react";
import type { NextPage } from "next";

import { fetchCampaigns } from "../lib/storage";

import BasePage from "../components/BasePage";
import CampaignList from "../components/campaigns/lists/CampaignList";
import Container from "../components/common/Container";
import { Campaign } from "../types/campaign";

interface Props {
  campaigns: Campaign[];
}

const HomePage: NextPage = ({ campaigns }: Props) => {
  return (
    <Container>
      <BasePage campaigns={campaigns}>
        <CampaignList />
      </BasePage>
    </Container>
  );
};

export default HomePage;

export async function getServerSideProps() {
  const campaignsIndex = await fetchCampaigns();
  return { props: { campaigns: campaignsIndex } };
}
