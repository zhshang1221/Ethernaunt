// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract Victim{
    mapping(address => uint) public deposits;

    constructor () payable{}

    function deposit() public payable{
        deposits[msg.sender] += msg.value;
    }

    function update() public{
        uint value = deposits[msg.sender];
        safeTransferETH(msg.sender, value);
        deposits[msg.sender] = 0;
    }

    function getDeposit(address _account) public view returns(uint value){
        value = deposits[_account];
    }

    function safeTransferETH(address _to, uint _value) internal{
        (bool success, ) = _to.call{value: _value}(new bytes(0));
        require(success, "Transfer_Helper: ETH_TRANSFER_FAILED");
    }

    function getBalance() public view returns(uint balance){
        balance = address(this).balance;
    }

}