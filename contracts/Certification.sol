//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certification{

    uint256 constant ADMIN = 1; 
    uint256 constant ISSUER = 2; 
    uint256 constant VERIFIER = 4; 

    address public _owner;
    mapping(address => uint256) public userRoles;
    mapping(bytes  => address) public certificateData;
    mapping(address => string) public issuer;
    mapping(bytes32 => bool) public allowedIds;
    mapping(string => address) public ipfsHash;
    mapping(string => string) public key;

    event RoleAssigned(address indexed id, uint256 role);
    event IssuerAssigned(address indexed id, string org);
    event KeyGenerated(string indexed id, string privateKey);
    event CertificateGenerated(bytes indexed data, address indexed issuer, string ipfsHash);


    constructor() {
        _owner = msg.sender;
    }

    modifier hasRole(address _id, uint256 _role) {
            require((userRoles[_id] & _role) == _role, "Not authorized");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Not owner");
        _;
    }
 
    function assignRole(address _id, uint256 _role) public onlyOwner(){
        userRoles[_id] = userRoles[_id] | _role;
        emit RoleAssigned(_id, _role);
    }

    function assignedIssuer(address _id, string memory _org) public onlyOwner(){
        issuer[_id] = _org;
        emit IssuerAssigned(_id, _org);
    }

    function generateKey(string memory _id, string memory _privateKey) public {
        key[_id] = _privateKey;
        emit KeyGenerated(_id, _privateKey);
    }
                                                                                 
    function generateCertificate(                
        bytes memory _data,
        address _issuer,
        string memory _ipfsHash
    ) public hasRole(_issuer, ISSUER){
        certificateData[_data] = _issuer;
        ipfsHash[_ipfsHash] = _issuer;
        emit CertificateGenerated(_data, _issuer, _ipfsHash);
    } 

    function idIssuer(string memory _id) public view returns (string memory) {
        require(ipfsHash[_id] != address(0), "no institution found");
        return issuer[ipfsHash[_id]];
    }
     

    function dataIssuer(bytes memory _data) public view returns (string memory) {
        require(certificateData[_data] != address(0), "no institution found");
        return issuer[certificateData[_data]];
    }
}
                                   