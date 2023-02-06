const {ethers} = require('hardhat')

async function main(){
    const CampFactory = await ethers.getContractFactory("CompaignFactory")
    const cF = await CampFactory.deploy()

    await cF.deployed()

    console.log("factory deployed to: ", cF.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })