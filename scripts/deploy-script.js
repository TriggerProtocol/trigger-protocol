const { ethers } = require("hardhat");

async function main() {
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

  const TriggerNftTokenFactory = await ethers.getContractFactory("TriggerNFT");
  const triggerNftToken = await TriggerNftTokenFactory.deploy();
  await triggerNftToken.deployed();

  const triggerSetAddresstxn = await triggerProtocol.setFactoryAddresses(
    triggerToken.address,
    triggerXpToken.address,
    triggerNftToken.address
  );
  await triggerSetAddresstxn.wait();

  console.log("TGR token Contract deployed to:", triggerToken.address);
  console.log("xTGR token Contract deployed to:", triggerXpToken.address);
  console.log("NFT token Contract deployed to:", triggerNftToken.address);
  console.log(
    "Trigger Protocol Contract deployed to:",
    triggerProtocol.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
