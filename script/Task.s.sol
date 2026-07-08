// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

import {Script} from "forge-std/Script.sol";
import {Task} from "../src/Task.sol";

contract TaskScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("SEPOLIA_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        Task task = new Task(vm.addr(deployerPrivateKey));
        vm.stopBroadcast();
    }
}