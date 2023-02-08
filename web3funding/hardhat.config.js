/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config({path: './.env.local'})

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY

module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'polygon',
    networks: {
      hardhat: {},
      polgon: {
        url: process.env.NEXT_PUBLIC_RPC_URL,
        accounts: [privateKey],
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
