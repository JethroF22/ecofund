import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import hre, { ethers } from "hardhat";

chai.use(chaiAsPromised);

describe("Campaign", () => {
  const campaignGoal = ethers.utils.parseEther("1");
  let campaignDeadline = new Date("2022-07-19").getTime() / 1000;

  describe("creation", () => {
    it("creates a new campaign", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0].address;
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(
        campaignGoal,
        campaignDeadline,
        creator
      );
      await campaign.deployed();

      expect(await campaign.creator()).to.equal(creator);
      expect(await campaign.campaignGoal()).to.equal(campaignGoal);
      expect(await campaign.campaignDeadline()).to.equal(campaignDeadline);
    });
  });

  describe("pledging", () => {
    it("updates pledges", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0].address;
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(
        campaignGoal,
        campaignDeadline,
        creator
      );
      await campaign.deployed();
      const amount = ethers.utils.parseEther("0.1");

      await campaign.connect(donator).pledge({
        value: amount,
      });
      expect(await campaign.pledges(donator.address)).to.equal(amount);
      expect(await campaign.totalPledges()).to.equal(amount);
      expect(await campaign.numPledges()).to.equal(1);
      expect(await campaign.isSuccessful()).to.equal(false);
    });

    it("updates pledges and the state of the campaign", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0].address;
      const donatorOne = signers[1];
      const donatorTwo = signers[2];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(
        campaignGoal,
        campaignDeadline,
        creator
      );
      await campaign.deployed();
      const amountOne = ethers.utils.parseEther("0.1");
      const amountTwo = ethers.utils.parseEther("1");

      await campaign.connect(donatorOne).pledge({
        value: amountOne,
      });

      expect(await campaign.pledges(donatorOne.address)).to.equal(amountOne);
      expect(await campaign.numPledges()).to.equal(1);
      expect(await ethers.provider.getBalance(campaign.address)).to.equal(
        amountOne
      );
      expect(await campaign.isSuccessful()).to.equal(false);

      await campaign.connect(donatorTwo).pledge({
        value: amountTwo,
      });
      expect(await campaign.pledges(donatorTwo.address)).to.equal(amountTwo);
      expect(await campaign.totalPledges()).to.equal(amountOne.add(amountTwo));
      expect(await campaign.numPledges()).to.equal(2);
      expect(await campaign.isSuccessful()).to.equal(true);
    });

    it("fails if the amount sent is zero", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0].address;
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(
        campaignGoal,
        campaignDeadline,
        creator
      );
      await campaign.deployed();

      expect(
        campaign.connect(donator).pledge({
          value: 0,
        })
      ).to.eventually.be.rejectedWith("Insufficient pledge");
    });

    it("fails if the deadline has passed", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0].address;
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(
        campaignGoal,
        campaignDeadline,
        creator
      );
      await campaign.deployed();

      await campaign.updateDeadlineState(true);

      expect(
        campaign.connect(donator).pledge({
          value: 0,
        })
      ).to.eventually.be.rejectedWith("Insufficient pledge");
    });
  });

  describe("withdrawal", () => {
    it("allows creator to withdraw funds if the campaign is successful", async () => {
      campaignDeadline = new Date("2022-07-5").getTime() / 1000;
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(
        campaignGoal,
        campaignDeadline,
        creator.address
      );
      await campaign.deployed();
      const amount = ethers.utils.parseEther("1");

      await campaign.connect(donator).pledge({
        value: amount,
      });

      await campaign.updateDeadlineState(true);

      await campaign.connect(creator).withdraw();

      expect(await ethers.provider.getBalance(campaign.address)).to.equal(0);
    });

    it("doesn't allow withdrawal before the campaign deadline has passed", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(
        campaignGoal,
        campaignDeadline,
        creator.address
      );
      await campaign.deployed();
      const amount = ethers.utils.parseEther("1");

      await campaign.connect(donator).pledge({
        value: amount,
      });

      expect(
        campaign.connect(creator).withdraw()
      ).to.eventually.be.rejectedWith("Deadline has not passed");
    });

    it("doesn't allow withdrawal if the goal hasn't been reached", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(
        campaignGoal,
        campaignDeadline,
        creator.address
      );
      await campaign.deployed();
      const amount = ethers.utils.parseEther("0.5");

      await campaign.connect(donator).pledge({
        value: amount,
      });

      await campaign.updateDeadlineState(true);

      expect(
        campaign.connect(creator).withdraw()
      ).to.eventually.be.rejectedWith("Campaign goals not reached");
    });

    it("doesn't allow someone besides the owner to withdraw the funds", async () => {
      const signers = await ethers.getSigners();
      const creator = signers[0];
      const donator = signers[1];
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = await Campaign.deploy(
        campaignGoal,
        campaignDeadline,
        creator.address
      );
      await campaign.deployed();
      const amount = ethers.utils.parseEther("1");

      await campaign.connect(donator).pledge({
        value: amount,
      });

      await campaign.updateDeadlineState(true);

      expect(
        campaign.connect(donator).withdraw()
      ).to.eventually.be.rejectedWith("Unauthorized");
    });
  });
});
