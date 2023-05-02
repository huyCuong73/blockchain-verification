const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
    const {deployer} = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer);
    
    console.log("Dunding...");

    const txnRes = await fundMe.fund({value: ethers.utils.parseEther("0.01")})
    await txnRes.wait(1)

    console.log("Funded!!!");
}


main()
  	.then(() => process.exit(0))
  	.catch((err) => {
   		console.log(err);
    	process.exit(1) ;
 	})