require('dotenv').config();
const BatchAbi = require('../../frontend/src/ABI/BatchManagement.json');
const { ethers } = require('ethers');

provider = new ethers.JsonRpcProvider(
  `https://optimism-sepolia.infura.io/v3/${process.env.HARDHAT_INFURA_PROJECT_ID}`,
);
const wallet = new ethers.Wallet(process.env.HARDHAT_PRIVATE_KEY, provider);

const contractAddress = '0x3E6760751207201Cfc864682F478eBE36E46F35f';

const BatchManagementContract = new ethers.Contract(
  contractAddress,
  BatchAbi,
  wallet,
);

async function sendData() {
  const tx = await BatchManagementContract.batchPushData(1, 41, 14, 250, 0, 10);
  console.log('Success');
  await tx.wait();
}

sendData();
