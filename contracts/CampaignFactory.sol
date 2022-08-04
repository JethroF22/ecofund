//SPDX-License-Identifier: Unlicense
pragma solidity =0.8.4;

import "./Campaign.sol";
import "hardhat/console.sol";

contract CampaignFactory {
    event CampaignCreated(address newAddress);

    Campaign[] public campaigns;

    function createCampaign(uint256 _campaignGoal, address _creator) external {
        Campaign newCampaign = new Campaign(
            _campaignGoal, _creator
        );
        campaigns.push(newCampaign);
        emit CampaignCreated(address(newCampaign));
    }
}