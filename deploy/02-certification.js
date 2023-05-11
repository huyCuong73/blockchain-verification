// function deployFunc(){

const { default: Ethers } = require("@typechain/ethers-v5");
const { network, ethers } = require("hardhat");
const {networkConfig, developmentChain} = require("../helper-config")
// }
// module.exports.default = deployFunc


module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId;
 
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    const fundMe = await deploy("Certification", {
        contract: "Certification",
        from: deployer,
        log: true,
    })
    
    const FundMe = await ethers.getContract("Certification", deployer)
    // const a = await ethers.getSigners()
    // log("asdsa: " + a[1].address)
    // const accounts = await ethers.getSigners()
    // const attacker = accounts[1]
    // log("as: "+ accounts[1].address)
    log("deployer", deployer)
    log("--------------------------------------")
}

module.exports.tags = ["all","certification"]