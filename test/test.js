const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");
describe("Trigger Protocol", function () {
  let owner;
  let addr1;
  let addr2;
  let addrs;
  beforeEach(async function () {
    await hre.network.provider.send("hardhat_reset");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
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
        const trigTxn = await triggerProtocol.createPortal("d32sadc", 5500);
        await trigTxn.wait();
        trigTxn = await triggerProtocol
          .connect(addr2)
          .createPortal("d32sadc", 5500);
        await trigTxn.wait();
      });
    });
    describe("join portal ", () => {
      it("Portal joined", async function () {
        const trigTxn = await triggerProtocol.joinPortal(1);
        await trigTxn.wait();
        trigTxn = await triggerProtocol.connect(addr2).joinPortal(1);
        await trigTxn.wait();
      });
    });

    describe("Mint NFT Token", () => {
      it("NFT minted", async function () {
        const trigTxn = await triggerProtocol.mintNFT(1, "dssdcd32");
        await trigTxn.wait();
      });
    });

    describe("Claim XP Token", () => {
      it("XP Token Claimed", async function () {
        const trigTxn = await triggerProtocol.claimXpToken(
          1,
          ethers.utils.parseUnits("2", "ether")
        );
        await trigTxn.wait();
        trigTxn = await triggerProtocol
          .connect(addr2)
          .claimXpToken(1, ethers.utils.parseUnits("5", "ether"));
        await trigTxn.wait();
      });
    });
    describe("Stake Token", () => {
      it("Token Staked ", async function () {
        // const trigTxn = await triggerXpToken.approve(
        //   triggerProtocol.address,
        //   20
        // );
        // await trigTxn.wait();

        const trigTxn1 = await triggerProtocol.stake(
          1,
          ethers.utils.parseUnits("1", "ether")
        );
        await trigTxn1.wait();
        trigTxn1 = await triggerProtocol
          .connect(addr2)
          .stake(1, ethers.utils.parseUnits("0.5", "ether"));
        await trigTxn1.wait();
      });
    });

    describe("Distribute Stake", () => {
      it("reward distributed ", async function () {
        const trigTxn1 = await triggerProtocol.distribureRewards(1,ethers.utils.parseUnits("10", "ether"));
        await trigTxn1.wait();
      });
    });
    // describe("staked Token Withdrawal", () => {
    //   it("Token withdrawed ", async function () {
    //     setTimeout(async () => {
    //       const trigTxn1 = await triggerProtocol.withdraw(1);
    //       await trigTxn1.wait();
    //     }, 2000);
    //   });
    // });
  });
});
