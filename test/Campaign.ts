import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import hre, { ethers } from "hardhat";

chai.use(chaiAsPromised);

describe("Campaign", () => {
  const campaignGoal = ethers.utils.parseEther("1");
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
    expect(await ethers.provider.getBalance(campaign.address)).to.equal(amount);
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
    expect(await ethers.provider.getBalance(campaign.address)).to.equal(
      amountOne
    );
    expect(await campaign.isSuccessful()).to.equal(false);

    await campaign.connect(donatorTwo).pledge({
      value: amountTwo,
    });
    expect(await campaign.pledges(donatorTwo.address)).to.equal(amountTwo);
    expect(await ethers.provider.getBalance(campaign.address)).to.equal(
      amountOne.add(amountTwo)
    );
    expect(await campaign.isSuccessful()).to.equal(true);
  });
});
