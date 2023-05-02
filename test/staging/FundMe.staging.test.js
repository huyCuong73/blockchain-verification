const { assert } = require("chai")
const { getNamedAccounts, ethers, network,deployments } = require("hardhat")
const {developmentChains} = require("../../helper-config")


developmentChains.includes(network.name)
? describe.skip
: describe("FundMe",async () => {
    let fundMe 
    let deployer
    const sendValue = ethers.utils.parseEther("0.1")

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        fundMe = await ethers.getContract("FundMe", deployer )
    })

    describe("fund", () => {
        it("allows people to fund and withdraw", async () => {
            await fundMe.fund({value: sendValue})
            await fundMe.withdraw()
            const endingBalance = await fundMe.provider.getBalance(fundMe.address)

            assert.equal(endingBalance.toString(),"0")
        })
    })

})
