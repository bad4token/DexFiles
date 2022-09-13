// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract NumberChanger {

    uint256 number;

    function getNumber() public view returns(uint256) {
        return number;
    }

    function setNumber(uint256 _number) public {
        number = _number;
     }

}