import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { Contract } from "ethers";
import hre, { ethers } from "hardhat";

import ERC20abi from "../abis/ERC20abi.json";

chai.use(chaiAsPromised);

describe("Campaign", () => {
  const campaignGoal = 1000; // Goal in USDC
  const usdcAccountAddress = "0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245";
  const adminAddress = "0x9613832c4e1987a1af5d0f59952262f60d641f35";
  let USDCcontract: Contract;

  before(async () => {
    const signers = await ethers.getSigners();
  });

  beforeEach(async () => {
    await hre.network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl: process.env.ALCHEMY_URL || "",
            blockNumber: Number(process.env.FORK_BLOCK_NUMBER) || 30561376,
          },
        },
      ],
    });
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [usdcAccountAddress],
    });
    const sourceAccountSigner = await ethers.getSigner(usdcAccountAddress);
    USDCcontract = await ethers.getContractAt(
      ERC20abi,
      "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      sourceAccountSigner
    );
    const signers = await ethers.getSigners();
    await USDCcontract.connect(sourceAccountSigner).transfer(
      signers[0].address,
      10000
    );
    await USDCcontract.connect(sourceAccountSigner).transfer(
      signers[1].address,
      10000
    );
    await USDCcontract.connect(sourceAccountSigner).transfer(
      signers[2].address,
      10000
    );
    await signers[0].sendTransaction({
      to: adminAddress,
      value: ethers.utils.parseEther("1"),
    });
  });

  describe("creation", () => {
    it("creates a new campaign", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0].address;
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator);
      await campaign.deployed();

      expect(await campaign.creator()).to.equal(creator);
      expect(await campaign.campaignGoal()).to.equal(campaignGoal);
    });
  });

  describe("pledging", () => {
    it("updates pledges", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0].address;
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator);
      await campaign.deployed();
      const amount = 100;

      await USDCcontract.connect(donator).approve(campaign.address, 0);
      await USDCcontract.connect(donator).approve(campaign.address, amount);

      await campaign.connect(donator).pledge(amount);
      expect(await campaign.pledges(donator.address)).to.equal(amount);
      expect(await campaign.totalPledges()).to.equal(amount);
      expect(await campaign.numPledges()).to.equal(1);
      expect(await USDCcontract.balanceOf(campaign.address)).to.equal(amount);
      expect(await campaign.isSuccessful()).to.equal(false);
    });

    it("updates pledges and the state of the campaign", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0].address;
      const donatorOne = signers[1];
      const donatorTwo = signers[2];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator);
      await campaign.deployed();
      const amountOne = 100;
      const amountTwo = 1000;
      await USDCcontract.connect(donatorOne).approve(campaign.address, 0);
      await USDCcontract.connect(donatorOne).approve(
        campaign.address,
        amountOne
      );
      await USDCcontract.connect(donatorTwo).approve(campaign.address, 0);
      await USDCcontract.connect(donatorTwo).approve(
        campaign.address,
        amountTwo
      );

      await campaign.connect(donatorOne).pledge(amountOne);

      expect(await campaign.pledges(donatorOne.address)).to.equal(amountOne);
      expect(await campaign.numPledges()).to.equal(1);
      expect(await USDCcontract.balanceOf(campaign.address)).to.equal(
        amountOne
      );
      expect(await campaign.isSuccessful()).to.equal(false);

      await campaign.connect(donatorTwo).pledge(amountTwo);
      expect(await campaign.pledges(donatorTwo.address)).to.equal(amountTwo);
      expect(await campaign.totalPledges()).to.equal(1100);
      expect(await campaign.numPledges()).to.equal(2);
      expect(await campaign.isSuccessful()).to.equal(true);
    });

    it("fails if the amount sent is zero", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0].address;
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator);
      await campaign.deployed();

      expect(campaign.connect(donator).pledge(0)).to.eventually.be.rejectedWith(
        "Insufficient pledge"
      );
    });

    it("fails if withdrawals are unlocked", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0].address;
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator);
      await campaign.deployed();
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [adminAddress],
      });
      const adminSigner = await ethers.getSigner(adminAddress);

      await campaign.connect(adminSigner).setWithdrawalsLockedState(false);

      expect(campaign.connect(donator).pledge(0)).to.eventually.be.rejectedWith(
        "Pledges locked"
      );
    });
  });

  describe("campaign cancellation", () => {
    it("cancels a new campaign", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator.address);
      await campaign.deployed();

      const donatorOne = signers[1];
      const donatorTwo = signers[2];
      const amountOne = 100;
      const amountTwo = 900;
      await USDCcontract.connect(donatorOne).approve(campaign.address, 0);
      await USDCcontract.connect(donatorOne).approve(
        campaign.address,
        amountOne
      );
      await USDCcontract.connect(donatorTwo).approve(campaign.address, 0);
      await USDCcontract.connect(donatorTwo).approve(
        campaign.address,
        amountTwo
      );

      await campaign.connect(donatorOne).pledge(amountOne);

      await campaign.connect(donatorTwo).pledge(amountTwo);

      await campaign.connect(creator).cancelCampaign();

      expect(await USDCcontract.balanceOf(campaign.address)).to.equal(0);
    });

    it("only allows the creator to cancel the campaign", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0].address;
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator);
      await campaign.deployed();

      expect(
        campaign.connect(donator).cancelCampaign()
      ).to.eventually.be.rejectedWith("Unauthorized");
    });

    it("doesn't allow pledges to a cancelled campaign", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator.address);
      await campaign.deployed();

      await campaign.connect(creator).cancelCampaign();

      expect(
        campaign.connect(donator).pledge(100)
      ).to.eventually.be.rejectedWith("Campaign cancelled");
    });
  });

  describe("withdrawal", () => {
    it("allows creator to withdraw funds if the campaign is successful", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator.address);
      await campaign.deployed();

      const amount = 1000;

      await USDCcontract.connect(donator).approve(campaign.address, 0);
      await USDCcontract.connect(donator).approve(campaign.address, amount);

      await campaign.connect(donator).pledge(amount);

      expect(await USDCcontract.balanceOf(campaign.address)).to.equal(amount);
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [adminAddress],
      });
      const adminSigner = await ethers.getSigner(adminAddress);

      await campaign.connect(adminSigner).setWithdrawalsLockedState(false);

      await campaign.connect(creator).withdraw();

      expect(await USDCcontract.balanceOf(campaign.address)).to.equal(0);
    });

    it("doesn't allow withdrawal if they are locked", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator.address);
      await campaign.deployed();

      const amount = 1000;
      await USDCcontract.connect(donator).approve(campaign.address, 0);
      await USDCcontract.connect(donator).approve(campaign.address, amount);

      await campaign.connect(donator).pledge(amount);

      expect(
        campaign.connect(creator).withdraw()
      ).to.eventually.be.rejectedWith("Withdrawals locked");
    });

    it("doesn't allow someone besides the owner to withdraw the funds", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator.address);
      await campaign.deployed();

      const amount = 1000;
      await USDCcontract.connect(donator).approve(campaign.address, 0);
      await USDCcontract.connect(donator).approve(campaign.address, amount);

      await campaign.connect(donator).pledge(amount);

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [adminAddress],
      });
      const adminSigner = await ethers.getSigner(adminAddress);

      await campaign.connect(adminSigner).setWithdrawalsLockedState(false);

      expect(
        campaign.connect(donator).withdraw()
      ).to.eventually.be.rejectedWith("Unauthorized");
    });
  });

  describe("pledge cancellation", () => {
    it("allows donators to cancel their pledges", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator.address);
      await campaign.deployed();

      const amount = 100;
      await USDCcontract.connect(donator).approve(campaign.address, 0);
      await USDCcontract.connect(donator).approve(campaign.address, amount);
      await campaign.connect(donator).pledge(amount);

      expect(await campaign.pledges(donator.address)).to.equal(amount);
      expect(await campaign.totalPledges()).to.equal(amount);
      expect(await campaign.numPledges()).to.equal(1);
      expect(await USDCcontract.balanceOf(campaign.address)).to.equal(amount);

      await campaign.connect(donator).cancelPledge();
      expect(await campaign.totalPledges()).to.equal(0);
      expect(await campaign.numPledges()).to.equal(0);
      expect(await USDCcontract.balanceOf(campaign.address)).to.equal(0);
    });

    it("fails if no pledge has been made", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator.address);
      await campaign.deployed();

      expect(
        campaign.connect(donator).cancelPledge()
      ).to.eventually.be.rejectedWith("Have not pledged");
    });

    it("fails if withdrawals are unlocked", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(campaignGoal, creator.address);
      await campaign.deployed();

      const amount = 1000;
      await USDCcontract.connect(donator).approve(campaign.address, 0);
      await USDCcontract.connect(donator).approve(campaign.address, amount);

      await campaign.connect(donator).pledge(amount);
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [adminAddress],
      });
      const adminSigner = await ethers.getSigner(adminAddress);

      await campaign.connect(adminSigner).setWithdrawalsLockedState(false);

      expect(
        campaign.connect(donator).cancelPledge()
      ).to.eventually.be.rejectedWith("Campaign was successful");
    });
  });
});
