import React from "react";
import Image from "next/image";

import { CampaignRecord } from "../../../types/campaign";

interface Props {
  campaign: CampaignRecord;
}

function CampaignListItem({ campaign }: Props) {
  const campaignDeadline = new Date(campaign.deadline * 1000);
  const description =
    campaign.description.length > 40
      ? `${campaign.description.substring(0, 37)}...`
      : campaign.description;
  return (
    <div className="h-[360px] w-[432px] shadow-lg flex flex-col justify-start items-start antialiased mt-12">
      <Image
        alt={`${campaign.name} Banner Image`}
        src={campaign.bannerImage}
        width={432}
        height={288}
      />
      <p className="text-2xl ml-2 mb-1 mt-1 text-gray-700 font-semibold uppercase">
        {campaign.name}
      </p>
      <p className="text-l ml-2 text-gray-600 leading-5">{description}</p>
      <p className="text-l ml-2 text-gray-600 leading-5">
        Goal: ${campaign.campaignGoal}
      </p>
      <p className="text-l ml-2 text-gray-600 leading-5 mb-2">
        Ends on: {campaignDeadline.toDateString()}
      </p>
    </div>
  );
}

export default CampaignListItem;
