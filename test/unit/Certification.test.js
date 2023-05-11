const { expect } = require("chai");
const { ethers } = require("hardhat");
const { waffle } = require("hardhat");


const ADMIN = 1;
const ISSUER = 2;
const VERIFIER = 4;

describe("Certification", function () {
	let Certification;
	let certification;
	let owner;
	let addr1;
	let addr2;
	let addrs;

	beforeEach(async function () {
	
		Certification = await ethers.getContractFactory("Certification");
		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();


		certification = await Certification.deploy();
		await certification.deployed();
	});


	it("Should set the owner as the deployer", async function () {
		expect(await certification._owner()).to.equal(owner.address);
	});


	it("Should assign a role to an address by the owner", async function () {

		await certification.connect(owner).assignRole(addr1.address, ISSUER);


		expect(await certification.userRoles(addr1.address)).to.equal(ISSUER);


		expect(await certification)
		.to.emit(certification, "RoleAssigned")
		.withArgs(addr1.address, ISSUER);
	});

	it("Should revert if a non-owner tries to assign a role", async function () {

		await expect(
		certification.connect(addr1).assignRole(addr2.address, VERIFIER)
		).to.be.revertedWith("Not owner");
	});


	it("Should assign an issuer name to an address by the owner", async function () {
	
		await certification.connect(owner).assignedIssuer(addr1.address, "ABC");


		expect(await certification.issuer(addr1.address)).to.equal("ABC");

	
		expect(await certification)
		.to.emit(certification, "IssuerAssigned")
		.withArgs(addr1.address, "ABC");
	});

	it("Should revert if a non-owner tries to assign an issuer name", async function () {

		await expect(
		certification.connect(addr1).assignedIssuer(addr2.address, "XYZ")
		).to.be.revertedWith("Not owner");
	});


	it("Should generate a private key for an ID", async function () {

		await certification.generateKey("abc", "123");


		expect(await certification.key("abc")).to.equal("123");


		expect(await certification)
		.to.emit(certification, "KeyGenerated")
		.withArgs("abc", "123");
	});


	it("Should generate a certificate data and IPFS hash for an issuer", async function () {

		await certification.connect(owner).assignRole(addr1.address, ISSUER);


		const data = ethers.utils.formatBytes32String("data");
		const ipfsHash = "Qm...";
		await certification.connect(addr1).generateCertificate(data, addr1.address, ipfsHash);


		expect(await certification.certificateData(data)).to.equal(addr1.address);
		expect(await certification.ipfsHash(ipfsHash)).to.equal(addr1.address);


		expect(await certification)
		.to.emit(certification, "CertificateGenerated")
	})}
)