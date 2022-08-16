import React, { useState } from "react";
import Image from "next/image";

import { Campaign, CampaignContractDetails } from "../../../types/campaign";

import Button from "../../common/Button";

interface Props {
  address: string;
  currentUser: string;
  campaign: Campaign;
  campaignDetails: CampaignContractDetails;
  isLoading: boolean;
}

function CampaignDetails({
  address,
  campaign,
  isLoading,
  campaignDetails,
  currentUser,
}: Props) {
  const [pageNumber, setPageNumber] = useState(1);
  const campaignDeadline = new Date(campaign.deadline * 1000);

  const getProgressToGoal = (totalPledges: number) =>
    (totalPledges || 0 / campaign.campaignGoal) * 100;

  return (
    <div className="h-5/6 w-4/6 m-auto flex justify-center items-start pl-5">
      <div className="w-3/6 h-full mt-18 flex flex-col justify-start items-start">
        <p className="text-2xl font-semibold mb-2 uppercase">{campaign.name}</p>
        <div className="h-[288px] w-[576px] shadow-lg flex flex-col justify-center items-center mb-5 rounded overflow-hidden">
          <Image
            alt={`${campaign.name} Banner Image`}
            src={campaign.bannerImage}
            width={576}
            height={288}
          />
        </div>
        <div className="w-[576px] border-t border-b border-black flex items-start justify-start py-5 mb-2">
          <p className="text-left mr-2">
            Created on {new Date(campaign.creationDate).toDateString()}
          </p>
          <p className="text-left mr-2">&bull;</p>
          <p className="text-left">Ends on {campaignDeadline.toDateString()}</p>
        </div>
        <div className="w-[576px] h-3/6 overflow-y-auto">
          <p className="text-xl">{campaign.description}</p>
        </div>
      </div>
      <div className="w-1/3 h-3/6 ml-10  mt-9 flex items-center justify-center bg-white rounded">
        {isLoading && (
          <div className="flex items-center justify-center h-3/5">
            <div className="mr-10 h-20 flex items-center">
              <p className="text-2xl">Loading...</p>
            </div>
            <div className="ml-10 w-12 h-12 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        )}
        {!isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-start p-4">
            <p className="text-xl">
              ${campaignDetails.totalPledges} of ${campaign.campaignGoal}{" "}
              collected
            </p>
            <div className="shadow w-3/5 bg-gray-200 rounded mt-2">
              <div
                className="bg-blue-400 text-xs leading-none py-1 text-center text-white"
                style={{
                  width: `${getProgressToGoal(campaignDetails.totalPledges)}%`,
                }}
              ></div>
            </div>
            {currentUser !== campaign.creator && (
              <Button
                className="mt-6 w-5/6"
                onClick={() => console.log("donating...")}
              >
                <p className="text-xl">Donate</p>
              </Button>
            )}
            {campaignDetails.donators.length === 0 && (
              <div className="h-3/6 mt-5 flex items-center justify-center">
                {currentUser !== campaign.creator && (
                  <p className="text-xl">Be the first to donate!</p>
                )}
                {currentUser === campaign.creator && (
                  <p className="text-xl">No donators</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CampaignDetails;
