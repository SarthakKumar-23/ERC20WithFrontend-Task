// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Task is ERC20, Ownable {
    error AmountYouWantToMintIsEqualToZero();

    constructor(address initialOwner) ERC20("Task", "TSK") Ownable(initialOwner) {}

    function mint(address to, uint256 amount) public onlyOwner {
        if (amount == 0) {
            revert AmountYouWantToMintIsEqualToZero();
        }
        _mint(to, amount);
    }    
}