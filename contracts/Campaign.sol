//SPDX-License-Identifier: Unlicense
pragma solidity =0.8.4;

import "hardhat/console.sol";

contract Campaign {
    address public creator;
    uint256 public campaignGoal;
    uint256 public campaignDeadline;

    constructor(uint256 _campaignGoal, uint256 _campaignDeadline, address _creator) {
        creator = _creator;
        campaignGoal = _campaignGoal;
        campaignDeadline = _campaignDeadline;
    }
}