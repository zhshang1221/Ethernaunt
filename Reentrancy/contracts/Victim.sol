// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Victim{

    mapping(address => uint) public balances;

    receive() external payable{}

    function deposit(uint _amount) public payable{
        balances[msg.sender] += _amount;
    }

    function balanceOf(address _account) public view returns (uint _balance){
        _balance = balances[_account];
    }

    function withdraw(address _to, uint _value) public{
        require(_value < address(this).balance, "INSUFFICIENT_BALANCE");
        require(_value < balances[_to], "INSUFFICIENT_QUOTA");

        _to.call{value: _value}("");

        unchecked {
            balances[_to] -= _value;
        }
    }
}