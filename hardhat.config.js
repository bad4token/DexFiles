require("@nomicfoundation/hardhat-toolbox");

//require("@nomiclabs/hardhat-waffle");
//require("@nomiclabs/hardhat-etherscan");
let secrets = require("./secrets");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "1337",       // Any network (default: none)
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/75eefb9868c74cccb605c888eafaa629`,
      accounts: [`6057f0dd091784f4199219cac0a86e250a0783934fb393940af1e35ca4227b6d`]
    },
   },
  solidity: "0.8.16",
  paths: {
    artifacts: './src/artifacts',
  },
};
