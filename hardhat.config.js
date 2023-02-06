require("@nomiclabs/hardhat-waffle")
require('dotenv').config({path: './.env.local'})

task("accounts", "print account", async(taskarg, hre) => {
  const account = await hre.ethers.getSigners();

  for(const acc of account){
    console.log(acc.address)
  }
})

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY

module.exports = {
  solidity: "0.8.10",
  defaultNetwork: "polygon",
  networks: {
    hardhat: {},
    polygon: {
      url: process.env.NEXT_PUBLIC_RPC_URL,
      accounts: [privateKey],
      // chainId: 80001
    }
  }
};
