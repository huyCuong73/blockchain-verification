require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/Ge8eGKZy28WQiTtPQIy7-vRl7Pdr7sz8",
            accounts: ["cf79932212a550f30db97ca8e253dcf5556905fe2dddb4bb95e86f25c6959c98"],
            chainId: 11155111
        },
        goerli: {
          url: "https://eth-goerli.g.alchemy.com/v2/XnacWRA62mI8td_pOMuqJwLOURTPEzCZ",
          accounts: ["cf79932212a550f30db97ca8e253dcf5556905fe2dddb4bb95e86f25c6959c98"],
          chainId: 5
        },
        localhost: {
          url: "http://127.0.0.1:8545/",
          chainId: 31337,
        }
        
    },
    etherscan: {
      apiKey: "NXUWW5H5KDXYAJF6W2BE88YHNT1Z9MEXTC"
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
