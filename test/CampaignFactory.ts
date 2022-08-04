import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import hre, { ethers } from "hardhat";

chai.use(chaiAsPromised);

describe("CampaignFactory", () => {
  const campaignGoal = 100000;
  it("creates a new campaign", async () => {
    const signers = await ethers.getSigners();
    const creator = signers[0].address;

    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    const campaignFactory = await CampaignFactory.deploy();
    await campaignFactory.deployed();

    await expect(campaignFactory.createCampaign(campaignGoal, creator)).to.emit(
      campaignFactory,
      "CampaignCreated"
    );

    const address = await campaignFactory.campaigns(0);
    const Campaign = await ethers.getContractFactory("Campaign");
    const campaign = Campaign.attach(address);

    expect(await campaign.creator()).to.equal(creator);
    expect(await campaign.campaignGoal()).to.equal(campaignGoal);
  });
});
