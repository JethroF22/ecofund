//SPDX-License-Identifier: Unlicense
pragma solidity =0.8.4;

import "hardhat/console.sol";

contract Campaign {
    address payable public creator;
    uint256 public campaignGoal;
    uint256 public campaignDeadline;
    mapping (address => uint256) public pledges;
    uint256 public totalPledges = 0;
    bool public isSuccessful;

    modifier _isCreator() {
        require(msg.sender == creator, "Unauthorised");
        _;
    }

    modifier _isWithdrawable() {
        require(block.timestamp > campaignDeadline, "Campaign still active");
        require(isSuccessful, "Campaign goals not reached");
        _;
    }

    constructor(uint256 _campaignGoal, uint256 _campaignDeadline, address _creator) {
        creator = payable(_creator);
        campaignGoal = _campaignGoal;
        campaignDeadline = _campaignDeadline;
    }

    function pledge() external payable {
        pledges[msg.sender] = msg.value;
        totalPledges += msg.value;
        if (address(this).balance >= campaignGoal) {
            isSuccessful = true;
        }
    }

    function withdraw() external _isCreator _isWithdrawable {
        creator.transfer(totalPledges);
    }
}