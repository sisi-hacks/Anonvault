import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const erc20 = await MockERC20.deploy("Public Mock Token", "PUB");
  await erc20.waitForDeployment();
  const erc20Address = await erc20.getAddress();
  console.log("MockERC20:", erc20Address);

  // Mint initial supply for deployer
  const mintTx = await erc20.mint(deployer.address, ethers.parseUnits("1000000", 18));
  await mintTx.wait();

  const Bridge = await ethers.getContractFactory("MockEERC20Bridge");
  const bridge = await Bridge.deploy(erc20Address);
  await bridge.waitForDeployment();
  const bridgeAddress = await bridge.getAddress();
  console.log("MockEERC20Bridge:", bridgeAddress);

  console.log("Set .env.local in the frontend with:");
  console.log("EERC_TOKEN_ADDRESS=", erc20Address);
  console.log("BRIDGE_ADDRESS=", bridgeAddress);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


