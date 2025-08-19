// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * Minimal mock of an "encrypted" ERC-20 bridge.
 * - deposit: lock public ERC20 and credit mock-private balance associated to (user, viewingKeyHash)
 * - transferPrivate: move mock-private balances without revealing amounts in events
 * - withdraw: burn mock-private balance and release public ERC20
 * - exportViewingKey: allow users to set/get a viewing key string (simulating selective disclosure)
 *
 * This is NOT secure. It's only for hackathon demo purposes.
 */
contract MockEERC20Bridge is Ownable {
    IERC20 public immutable token;

    // Simulated private ledger: balance keyed by address
    mapping(address => uint256) private _privateBalance;

    // Inbox of received transfers (amounts accessible only to recipient or when viewer has key)
    struct InboxItem { address from; uint256 amount; uint256 timestamp; }
    mapping(address => InboxItem[]) private _inbox;

    // Viewing key management
    mapping(address => bytes32) public viewingKeyHash; // keccak256(viewingKey)

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event PrivateTransfer(address indexed from, address indexed to); // omit amount
    event ViewingKeySet(address indexed user);

    constructor(IERC20 token_) Ownable(msg.sender) {
        token = token_;
    }

    function setViewingKey(string calldata viewingKey) external {
        viewingKeyHash[msg.sender] = keccak256(bytes(viewingKey));
        emit ViewingKeySet(msg.sender);
    }

    function getPrivateBalance(address user) external view returns (uint256) {
        return _privateBalance[user];
    }

    function getInbox(address user) external view returns (InboxItem[] memory) {
        return _inbox[user];
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "amount=0");
        require(token.transferFrom(msg.sender, address(this), amount), "transferFrom failed");
        _privateBalance[msg.sender] += amount;
        emit Deposited(msg.sender, amount);
    }

    function transferPrivate(address to, uint256 amount) external {
        require(to != address(0), "to=0");
        require(amount > 0, "amount=0");
        uint256 bal = _privateBalance[msg.sender];
        require(bal >= amount, "insufficient");
        unchecked {
            _privateBalance[msg.sender] = bal - amount;
            _privateBalance[to] += amount;
        }
        _inbox[to].push(InboxItem({ from: msg.sender, amount: amount, timestamp: block.timestamp }));
        emit PrivateTransfer(msg.sender, to);
    }

    function withdraw(uint256 amount, address to) external {
        require(to != address(0), "to=0");
        require(amount > 0, "amount=0");
        uint256 bal = _privateBalance[msg.sender];
        require(bal >= amount, "insufficient");
        unchecked { _privateBalance[msg.sender] = bal - amount; }
        require(token.transfer(to, amount), "transfer failed");
        emit Withdrawn(msg.sender, amount);
    }
}


