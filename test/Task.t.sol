// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

import {Test} from "forge-std/Test.sol";
import {Task} from "../src/Task.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract TaskTest is Test {
    Task public task;

    function setUp() public {
        task = new Task(vm.addr(1));
    }

    function testMint() public {
        vm.prank(vm.addr(1));
        task.mint(vm.addr(2), 100);
        assertEq(task.balanceOf(vm.addr(2)), 100);
    }

    function test_RevertMintByNonOwner() public {
        vm.prank(vm.addr(2));
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, vm.addr(2)));
        task.mint(vm.addr(3), 100);
    }

    function test_RevertMintZeroAmount() public {
        vm.prank(vm.addr(1));
        vm.expectRevert(abi.encodeWithSelector(Task.AmountYouWantToMintIsEqualToZero.selector, vm.addr(1)));
        task.mint(vm.addr(2), 0);
    }

    function test_transferWorks() public {
        vm.prank(vm.addr(1));
        task.mint(vm.addr(2), 100);
        vm.prank(vm.addr(2));
        task.transfer(vm.addr(3), 50);
        assertEq(task.balanceOf(vm.addr(2)), 50);
        assertEq(task.balanceOf(vm.addr(3)), 50);
    }

    function test_transferRevertsWhenInsufficientBalance() public {
        vm.prank(vm.addr(1));
        task.mint(vm.addr(2), 100);
        vm.prank(vm.addr(2));
        task.transfer(vm.addr(3), 150);
    }

    function test_balancesUpdateCorrectlyAfterMultipleTransfers() public {
        vm.prank(vm.addr(1));
        task.mint(vm.addr(2), 200);
        vm.prank(vm.addr(2));
        task.transfer(vm.addr(3), 50);
        vm.prank(vm.addr(3));
        task.transfer(vm.addr(4), 30);
        assertEq(task.balanceOf(vm.addr(2)), 150);
        assertEq(task.balanceOf(vm.addr(3)), 20);
        assertEq(task.balanceOf(vm.addr(4)), 30);
    }
}