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
    let ethUsdPriceFeedAddress
    if(chainId == 31337){
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
      

    const fundMe = await deploy("FundMe", {
        contract: "FundMe",
        from: deployer,
        args: [
            ethUsdPriceFeedAddress
        ],
        log: true,
    })
    
    const FundMe = await ethers.getContract("FundMe", deployer)
    // const a = await ethers.getSigners()
    // log("asdsa: " + a[1].address)
    // const accounts = await ethers.getSigners()
    // const attacker = accounts[1]
    // log("as: "+ accounts[1].address)
    log("deploy", deployer)
    log("--------------------------------------")
}

module.exports.tags = ["all","fundme"]
