require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.8.9",

  networks: {
    mumbai: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
