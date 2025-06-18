require('dotenv').config();
const BatchAbi = require('../../frontend/src/ABI/BatchManagement.json');
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider(``);
const wallet = new ethers.Wallet('', provider);

const contractAddress = '0xE954D7fFA466bA88B0B0aa50763DcA47F3164809';

const BatchManagementContract = new ethers.Contract(
  contractAddress,
  BatchAbi,
  wallet,
);

async function sendData() {
  const tx = await BatchManagementContract.batchPushData(1, 49, 19, 281, 0, 17);
  await tx.wait();
  console.log('success');
}

sendData();
