const hre = require("hardhat");

async function main() {

  const GuestBook = await hre.ethers.getContractFactory("GuestBook");
  const guestbook = await GuestBook.deploy();
  await guestbook.deployed();
  const LeasingContractFactory = await hre.ethers.getContractFactory("LeasingContractFactory");
  const leasingContractFactory = await LeasingContractFactory.deploy();
  await leasingContractFactory.deployed();
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy("0x0715A7794a1dc8e42615F059dD6e406A6594651A");
  await marketplace.deployed();

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});