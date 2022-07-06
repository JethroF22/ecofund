//SPDX-License-Identifier: Unlicense
pragma solidity =0.8.4;

import "hardhat/console.sol";

contract Campaign {

    address payable public creator;
    uint256 public campaignGoal;
    uint256 public campaignDeadline;
    mapping (address => uint256) public pledges;
    address[] public donators;
    uint256 public totalPledges = 0;
    uint256 public numPledges = 0;
    bool public hasDeadlinePassed;
    bool private isActive;
    bool public isSuccessful;

    constructor(uint256 _campaignGoal, uint256 _campaignDeadline, address _creator) {
        creator = payable(_creator);
        campaignGoal = _campaignGoal;
        campaignDeadline = _campaignDeadline;
        isActive = true;
        hasDeadlinePassed = false;
    }

    modifier _isCreator() {
        require(msg.sender == creator, "Unauthorised");
        _;
    }

    modifier _isWithdrawable() {
        require(hasDeadlinePassed, "Deadline has not passed");
        require(isSuccessful, "Campaign goals not reached");
        _;
    }

    function pledge() external payable {
        require(!hasDeadlinePassed, "Deadline has passed");
        require(isActive, "Campaign cancelled");
        require(msg.value > 0, "Insufficient pledge");
        pledges[msg.sender] = msg.value;
        donators.push(msg.sender);
        totalPledges += msg.value;
        numPledges += 1;
        if (address(this).balance >= campaignGoal) {
            isSuccessful = true;
        }
    }

    function updateDeadlineState(bool _hasPassed) external {
        hasDeadlinePassed = _hasPassed;
    }

    function updateCampaignState(bool _state) internal {
        isActive = _state;
    }

    function cancelCampaign() external _isCreator {
        updateCampaignState(false);
        for (uint256 index = 0; index < numPledges; index++) {
            address payable donator = payable(donators[index]);
            uint256 pledgeAmount = pledges[donator];
            donator.transfer(pledgeAmount);
        }
    }

    function withdraw() external _isCreator _isWithdrawable {
        creator.transfer(totalPledges);
    }
}