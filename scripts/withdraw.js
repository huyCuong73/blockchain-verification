const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
    const {deployer} = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer);
    
    console.log("Funding...");

    const txnRes = await fundMe.withdraw()
    await txnRes.wait(1)

    console.log("withdraw!!!");
}


main()
  	.then(() => process.exit(0))
  	.catch((err) => {
   		console.log(err);
    	process.exit(1) ;
 	})