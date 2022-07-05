import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import hre, { ethers } from "hardhat";

chai.use(chaiAsPromised);

describe("Campaign", () => {
  const campaignGoal = 100000;
  const campaignDeadline = new Date("2022-07-19").getUTCMilliseconds();
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
