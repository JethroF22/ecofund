import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import hre, { ethers } from "hardhat";

chai.use(chaiAsPromised);

describe("CampaignFactory", () => {
  const campaignGoal = 100000;
  let campaignDeadline = new Date("2022-07-19").getTime() / 1000;
  it("creates a new campaign", async () => {
    const signers = await ethers.getSigners();
    const creator = signers[0].address;

    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    const campaignFactory = await CampaignFactory.deploy();
    await campaignFactory.deployed();

    await campaignFactory.createCampaign(
      campaignGoal,
      campaignDeadline,
      creator
    );

    const address = await campaignFactory.campaigns(0);
    const Campaign = await ethers.getContractFactory("Campaign");
    const campaign = await Campaign.attach(address);

    expect(await campaign.creator()).to.equal(creator);
    expect(await campaign.campaignGoal()).to.equal(campaignGoal);
    expect(await campaign.campaignDeadline()).to.equal(campaignDeadline);
  });

  it("fails if the deadline is not a future date", async () => {
    campaignDeadline = new Date("2022-07-04").getTime() / 1000;
    const signers = await ethers.getSigners();
    const creator = signers[0].address;
    const Campaign = await ethers.getContractFactory("Campaign");
    const campaign = await Campaign.deploy(
      campaignGoal,
      campaignDeadline,
      creator
    );
    expect(campaign.deployed()).to.eventually.be.rejectedWith(
      "Invalid deadline"
    );
  });
});
