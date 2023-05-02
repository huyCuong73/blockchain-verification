const { ethers, network, run } = require("hardhat");

async function main() {
	const StorageFactory = await ethers.getContractFactory("FundMe");

	console.log("deploying...");

	const SimpleStorage = await StorageFactory.deploy("0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e");
	await SimpleStorage.deployed();
	console.log("deploy to: " + SimpleStorage.address);


	const currentValue = await SimpleStorage.priceFeed();
	// console.log(`current value :${currentValue}`);
    console.log(SimpleStorage);

}



main()
  	.then(() => process.exit(0))
  	.catch((err) => {
   		console.log(err);
    	process.exit(1) ;
 	})