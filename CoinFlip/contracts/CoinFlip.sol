// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./ICoinFlip.sol";

import "hardhat/console.sol";

contract CoinFlip is ICoinFlip{
    using SafeMath for uint256;
    
    uint public consecutiveWins;
    uint lastHash;
    uint FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor() {
        consecutiveWins = 0;
    }

    function flip(bool _guess) external returns (bool){
        uint blockValue = uint(blockhash(block.number.sub(1)));

        if(lastHash == blockValue){
            revert();
        }

        lastHash = blockValue;
        uint coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1? true: false;

        if(side == _guess){
            consecutiveWins++;

            console.log("Congratulations that you win this guess, and consecutive wins is", consecutiveWins);
            return true;
        }else{
            consecutiveWins = 0;
            return false;
        }

    }
}