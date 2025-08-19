export const mockERC20Abi = [
  { "type": "function", "name": "approve", "stateMutability": "nonpayable", "inputs": [ { "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" } ], "outputs": [ { "type": "bool" } ] },
  { "type": "function", "name": "allowance", "stateMutability": "view", "inputs": [ { "name": "owner", "type": "address" }, { "name": "spender", "type": "address" } ], "outputs": [ { "type": "uint256" } ] },
  { "type": "function", "name": "balanceOf", "stateMutability": "view", "inputs": [ { "name": "account", "type": "address" } ], "outputs": [ { "type": "uint256" } ] },
  { "type": "function", "name": "mint", "stateMutability": "nonpayable", "inputs": [ { "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" } ], "outputs": [] },
  { "type": "function", "name": "decimals", "stateMutability": "view", "inputs": [], "outputs": [ { "type": "uint8" } ] },
  { "type": "function", "name": "symbol", "stateMutability": "view", "inputs": [], "outputs": [ { "type": "string" } ] }
];

export const bridgeAbi = [
  { "type": "function", "name": "token", "stateMutability": "view", "inputs": [], "outputs": [ { "type": "address" } ] },
  { "type": "function", "name": "setViewingKey", "stateMutability": "nonpayable", "inputs": [ { "name": "viewingKey", "type": "string" } ], "outputs": [] },
  { "type": "function", "name": "getPrivateBalance", "stateMutability": "view", "inputs": [ { "name": "user", "type": "address" } ], "outputs": [ { "type": "uint256" } ] },
  { "type": "function", "name": "getInbox", "stateMutability": "view", "inputs": [ { "name": "user", "type": "address" } ], "outputs": [ { "type": "tuple[]", "components": [ { "name": "from", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "timestamp", "type": "uint256" } ] } ] },
  { "type": "function", "name": "deposit", "stateMutability": "nonpayable", "inputs": [ { "name": "amount", "type": "uint256" } ], "outputs": [] },
  { "type": "function", "name": "transferPrivate", "stateMutability": "nonpayable", "inputs": [ { "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" } ], "outputs": [] },
  { "type": "function", "name": "withdraw", "stateMutability": "nonpayable", "inputs": [ { "name": "amount", "type": "uint256" }, { "name": "to", "type": "address" } ], "outputs": [] }
];


