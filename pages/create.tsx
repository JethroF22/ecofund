import React from "react";

import BasePage from "../components/BasePage";
import Container from "../components/common/Container";
import CreateCampaignForm from "../components/campaigns/forms/CreateCampaignForm";

function create() {
  return (
    <Container>
      <BasePage>
        <CreateCampaignForm />
      </BasePage>
    </Container>
  );
}

export default create;
