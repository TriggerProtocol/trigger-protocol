const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");
describe("Trigger Protocol", function () {
  beforeEach(async function () {
    await hre.network.provider.send("hardhat_reset");
  });
  it("Contracts deployed", async function () {
    const TriggerTokenFactory = await ethers.getContractFactory("TriggerToken");
    const triggerToken = await TriggerTokenFactory.deploy(1000000);
    await triggerToken.deployed();

    const TriggerProtocolFactory = await ethers.getContractFactory(
      "TriggerProtocol"
    );
    const triggerProtocol = await TriggerProtocolFactory.deploy();
    await triggerProtocol.deployed();
    const TriggerXpTokenFactory = await ethers.getContractFactory(
      "TriggerXpToken"
    );
    const triggerXpToken = await TriggerXpTokenFactory.deploy(
      100000000,
      triggerProtocol.address
    );
    await triggerXpToken.deployed();

    const TriggerNftTokenFactory = await ethers.getContractFactory(
      "TriggerNFT"
    );
    const triggerNftToken = await TriggerNftTokenFactory.deploy();
    await triggerNftToken.deployed();

    const triggerSetAddresstxn = await triggerProtocol.setFactoryAddresses(
      triggerToken.address,
      triggerXpToken.address,
      triggerNftToken.address
    );
    await triggerSetAddresstxn.wait();

    expect(await triggerProtocol.triggerTokenFactory()).to.equals(
      triggerToken.address
    );

    describe("Create portal ", () => {
      it("Portal Created", async function () {
        const trigTxn = await triggerProtocol.createPortal("d32sadc",5500);
        await trigTxn.wait();
      });
    });
    describe("join portal ", () => {
      it("Portal joined", async function () {
        const trigTxn = await triggerProtocol.joinPortal(0);
        await trigTxn.wait();
      });
    });

    describe("Mint NFT Token", () => {
      it("NFT minted", async function () {
        const trigTxn = await triggerProtocol.mintToken(0, "dssdcd32");
        await trigTxn.wait();
      });
    });

    describe("Claim XP Token", () => {
      it("XP Token Claimed", async function () {
        const trigTxn = await triggerProtocol.claimXpToken(0, 100);
        await trigTxn.wait();
      });
    });
    describe("Stake Token", () => {
      it("Token Staked ", async function () {
        const trigTxn = await triggerXpToken.approve(
          triggerProtocol.address,
          20
        );
        await trigTxn.wait();
        const trigTxn1 = await triggerProtocol.stake(0, 20);
        await trigTxn1.wait();
      });
    });
    describe("staked Token Withdrawal", () => {
      it("Token withdrawed ", async function () {
        setTimeout(async () => {
          const trigTxn1 = await triggerProtocol.withdraw(0);
          await trigTxn1.wait();
        }, 2000);
      });
    });
  });
});
