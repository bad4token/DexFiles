// SPDX-License-Identifier: MIT

pragma solidity 0.8.8;

import "./Leasing.sol";

contract leasingContractFactory {

    function createLeasingContract(string memory name, string memory symbol) public {
        new Leasing(
            name, symbol, msg.sender
        );
    }
} 