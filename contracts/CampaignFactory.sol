//SPDX-License-Identifier: Unlicense
pragma solidity =0.8.4;

import "./Campaign.sol";
import "hardhat/console.sol";

contract CampaignFactory {
    Campaign[] public campaigns;
    function createCampaign(uint256 _campaignGoal, uint256 _campaignDeadline, address _creator) external {
        require(_campaignDeadline > block.timestamp, "Invalid deadline");
        Campaign newCampaign = new Campaign(
            _campaignGoal, _campaignDeadline, _creator
        );
        campaigns.push(newCampaign);
    }
}