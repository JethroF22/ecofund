import React, { useContext } from "react";

import { Context } from "../../../context/state";

import CampaignListItem from "./CampaignListItem";

function CampaignList() {
  const {
    state: { campaigns },
  } = useContext(Context);
  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-5/6 h-full m-auto grid md:grid-cols-3 sm:grid-cols-1 justify-items-center">
        {campaigns?.map((campaign) => (
          <CampaignListItem campaign={campaign} key={campaign.address} />
        ))}{" "}
      </div>
    </div>
  );
}

export default CampaignList;
