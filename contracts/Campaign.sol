//SPDX-License-Identifier: Unlicense
pragma solidity =0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";

contract Campaign {
    IERC20 public constant USDC_INSTANCE = IERC20(0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174);
    address public admin = 0x9613832C4E1987A1AF5d0f59952262F60d641F35;
    address public creator;
    uint256 public campaignGoal;
    mapping (address => uint256) public pledges;
    address[] public donators;
    uint256 public totalPledges = 0;
    bool private isActive;
    bool public isSuccessful;
    bool public withdrawalsLocked;

    constructor(uint256 _campaignGoal, address _creator) {
        creator = _creator;
        campaignGoal = _campaignGoal;
        isActive = true;
        withdrawalsLocked = true;
    }

    modifier _isCreator() {
        require(msg.sender == creator, "Unauthorised");
        _;
    }

    modifier _isAdmin() {
        require(msg.sender == admin, "Unauthorised");
        _;
    }

    modifier _isWithdrawable() {
        require(!withdrawalsLocked, "Withdrawals locked");
        _;
    }

    function pledge(uint256 _amount) external {
        require(withdrawalsLocked, "Pledges locked");
        require(isActive, "Campaign cancelled");
        require(_amount > 0, "Insufficient pledge");
        require(USDC_INSTANCE.balanceOf(msg.sender) >= _amount, "Insufficient funds");
        USDC_INSTANCE.transferFrom(msg.sender, address(this), _amount);
        pledges[msg.sender] = _amount;
        donators.push(msg.sender);
        totalPledges += _amount;
        if (totalPledges >= campaignGoal) {
            isSuccessful = true;
        }
    }

    function updateCampaignState(bool _state) internal {
        isActive = _state;
    }

    function setWithdrawalsLockedState(bool _state) external _isAdmin {
        withdrawalsLocked = _state;
    }

    function cancelCampaign() external _isCreator {
        updateCampaignState(false);
        uint256 arrayLength = numPledges();
        for (uint256 index = 0; index < arrayLength; index++) {
            address donator = donators[index];
            uint256 pledgeAmount = pledges[donator];
            USDC_INSTANCE.transfer(donator, pledgeAmount);
        }
    }

    function cancelPledge() external {
        require(pledges[msg.sender] > 0, "Have not pledged");
        require(withdrawalsLocked, "Pledges locked");
        uint256 pledgeAmount =  pledges[msg.sender];
        totalPledges -= pledgeAmount;
        delete pledges[msg.sender];
        uint256 indexOf = _findIndexOfDonator(msg.sender);
        _removeDonator(indexOf);
        USDC_INSTANCE.transfer(msg.sender, pledgeAmount);
    }

    function numPledges() public view returns(uint256) {
        return donators.length;
    }

    function _findIndexOfDonator(address _donator) internal view returns(uint256) {
        uint256 indexOf = 0;
        uint256 arrayLength = numPledges();
        for (uint256 index = 0; index < arrayLength; index++) {
            if (donators[index] == _donator) {
                indexOf = index;
                break;
            }
        }

        return indexOf;
    }

    function _removeDonator(uint256 _index) internal {
        if (_index >= donators.length) return;

        for (uint i = _index; i < donators.length-1; i++){
            donators[i] = donators[i+1];
        }
        donators.pop();
    }

    function withdraw() external _isCreator _isWithdrawable {
        USDC_INSTANCE.transfer(creator,totalPledges);
    }
}