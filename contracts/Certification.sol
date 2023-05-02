//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



contract Certification{

    uint256 constant ADMIN_ROLE = 1; // 001
    uint256 constant PUBLISH_ROLE = 2; // 010
    uint256 constant VALIDATE_ROLE = 4; // 100

    address private _owner;

    // A mapping of user ids to their role bitmasks
    mapping(bytes32 => uint256) public userRoles;


    constructor() {
        _owner = msg.sender;
    }
    
    

    struct Certificate {
        string candidateName;
        string orgName;
        string courseName;
        bytes32 ipfsHash;
    }

    mapping(bytes32 => Certificate) public certificates;
    mapping(bytes32 => bool) public allowedIds;
    mapping(bytes32 => bool) public ipfsHash;

    modifier hasRole(bytes32 _id, uint256 _role) {
            require((userRoles[_id] & _role) == _role, "Not authorized");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Not owner");
        _;
    }

    function assignRole(bytes32 _id, uint256 _role) public onlyOwner(){
        // You can add some logic here to restrict who can call this function
        userRoles[_id] = userRoles[_id] | _role;
    }

                                                                                 
    function generateCertificate(
        bytes32 _id,
        string memory _candidateName,
        string memory _orgName,
        string memory _courseName,
        bytes32 _ipfsHash
    ) public{
        certificates[_id] = Certificate(
            _candidateName,
            _orgName,
            _courseName,
            _ipfsHash
        );
        ipfsHash[_id] = true;
    }
              

    function isVerified(bytes32 _id) public view returns (bool) {
        if(ipfsHash[_id]){
            return true;
        }
        return false;
    }
}
                                   