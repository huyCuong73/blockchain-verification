//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./Converter.sol";

error FundMe__NotOwner();

contract FundMe {

    using Converter for uint256;
    uint256 public minimumUSD = 5 * 1e18;
    uint256 favoriteNumber = 5;
    address[] public funders; 
    mapping(address => uint256) public addressToAmountFunded;

    address public owner;
    
    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress){
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function fund() public payable{
        require(msg.value.getConversionRate(priceFeed) >= minimumUSD, "not enough");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        for (uint256 i = 0; i < funders.length; i++){
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);

        (bool callSuccess, ) = owner.call{value: address(this).balance}("");
        require(callSuccess,"failed");
    }

    modifier onlyOwner() {
        // require(msg.sender == i_owner);
        if (msg.sender != owner) revert FundMe__NotOwner();
        _;
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

}