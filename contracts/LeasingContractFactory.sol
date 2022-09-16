// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./Leasing.sol";

contract LeasingContractFactory {

    function createLeasingContract(string memory name, string memory symbol) public {
        new Leasing(
            name, symbol, msg.sender
        );
    }
} 