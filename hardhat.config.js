require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("hardhat-deploy")

const dotenv = require("dotenv")
dotenv.config()

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: process.env.ALCHEMY_SEPOLIA,
            accounts: [process.env.ACCOUNT],
            chainId: 11155111
        },
        goerli: {
            url: process.env.ALCHEMY_GOERLI,
            accounts: [process.env.ACCOUNT],
            chainId: 5
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        }
        
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_KEY
    },
    solidity: {
        compilers: [
            {
                version:"0.8.7"
            },{
                version:"0.6.6"
            }
        ]
    },
    gasReporter: {
      enabled:true,
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        }
    }
};
