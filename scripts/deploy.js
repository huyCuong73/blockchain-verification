const { ethers, network, run } = require("hardhat");

async function main() {
	const StorageFactory = await ethers.getContractFactory("Certification");

	console.log("deploying...");

	const Certification = await StorageFactory.deploy("0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e");
	await Certification.deployed();
	console.log("deploy to: " + Certification.address);

}



main()
  	.then(() => process.exit(0))
  	.catch((err) => {
   		console.log(err);
    	process.exit(1) ;
 	})