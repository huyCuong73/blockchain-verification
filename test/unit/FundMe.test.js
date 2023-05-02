const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const {developmentChains} = require("../../helper-config")
let r;

!developmentChains.includes(network.name) 
? describe.skip
:describe("FundMe",async () => {
    let fundMe 
    let deployer
    
    let MockV3Aggregator
    const sendValue = ethers.utils.parseEther("1")

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer )
        MockV3Aggregator = await ethers.getContract("MockV3Aggregator",deployer)
    })

    describe("constructor",async () => {
        it("set the aggeregator adresses", async () => {
            const res = await fundMe.priceFeed()
            assert.equal(res, MockV3Aggregator.address)
        })
    })  
    describe("fund", () => {
        it("Not enough eth", async () => {
            await expect(fundMe.fund()).to.be.revertedWith("not enough")
        })

        it("updated the amount funded data structure", async () => {
            await fundMe.fund({value: sendValue})
            const res = await fundMe.addressToAmountFunded(deployer)
            assert.equal(res.toString(), sendValue.toString())
        })
        it("adds funders to array of funders", async () => {
            await fundMe.fund({value: sendValue})
            const funder = await fundMe.funders(0)
            assert(funder, deployer)
        })
    })
    describe("withdraw", () => {
        beforeEach(async ()=> {
            await fundMe.fund({value: sendValue})
        })

        it("withdraw ETH from a single founder", async () => {
            const balance = await fundMe.provider.getBalance(fundMe.address)
            const deployerBalance = await fundMe.provider.getBalance(deployer)

            const txnRes = await fundMe.withdraw()
            const txnRcpt = await txnRes.wait(1)

            const { gasUsed, effectiveGasPrice } = txnRcpt;
            const gasCost = gasUsed.mul(effectiveGasPrice)

            const endingBalance = await fundMe.provider.getBalance(fundMe.address)
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer)
            
            assert.equal(endingBalance, 0)
            assert.equal((deployerBalance.add(balance)).toString(), endingDeployerBalance.add(gasCost).toString())
        })

        it("withdraw with multiple funders", async () => {
            const accounts = await ethers.getSigners()
            for (let i = 1; i < 6 ; i++){
                const connectedContract = await fundMe.connect(
                    accounts[i]
                )

                await connectedContract.fund({value: sendValue})
            }

            const balance = await fundMe.provider.getBalance(fundMe.address)
            const deployerBalance = await fundMe.provider.getBalance(deployer)

            const txnRes = await fundMe.withdraw()
            const txnRcpt = await txnRes.wait(1)

            const { gasUsed, effectiveGasPrice } = txnRcpt;
            const gasCost = gasUsed.mul(effectiveGasPrice)

            const endingBalance = await fundMe.provider.getBalance(fundMe.address)
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer)
            
            assert.equal(endingBalance, 0)
            assert.equal((
                deployerBalance.add(balance)).toString(), 
                endingDeployerBalance.add(gasCost).toString()
            )

            await expect(fundMe.funders(0)).to.be.reverted 

        })

        it("only owner", async () => {
            const accounts = await ethers.getSigners()
            const attacker = accounts[1]
            const attackerConnected = await fundMe.connect(attacker)

            await expect(
                attackerConnected.withdraw()
            ).to.be.revertedWithCustomError(fundMe, "FundMe__NotOwner")
        })

    })

})
