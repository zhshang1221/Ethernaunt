// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Victim{
    mapping(address => uint) public balances;

    function deposit() public payable{
        balances[msg.sender] = balances[msg.sender] + msg.value;
    }

    function balanceOf(address _account) public view returns(uint balance){
        balance = balances[_account];
    }

    function withdraw(address _to, uint _amount) payable public{
        require(balances[msg.sender] > _amount, "INSUFFICIENT_BALANCE");
        require(address(this).balance > _amount, "INSUFFICIENT_IN_WALLET");

        _to.call{value: _amount}("");

        // unchecked {
        balances[msg.sender] -= _amount;
        // }

        console.log("[RE withdraw]balance[%s]:%s" ,msg.sender , balances[msg.sender]);
    }

    receive() external payable{}

}