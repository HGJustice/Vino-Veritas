import pkg from '@iota/sdk';
const { Client, hexToUtf8, initLogger, TaggedDataPayload, utf8ToHex, Utils } =
  pkg;

// Shimmer Testnet
const NODE_URL = 'https://api.testnet.shimmer.network';
const EXPLORER_URL = 'https://explorer.shimmer.network/shimmer-testnet';

// Initialize and run the example
async function run() {
  initLogger();

  const client = new Client({
    nodes: [NODE_URL], // Use hardcoded node URL
  });

  const options = {
    tag: utf8ToHex('wag 1'),
    data: utf8ToHex('Tangle'),
  };

  try {
    const mnemonic = Utils.generateMnemonic();
    const secretManager = { mnemonic: mnemonic };

    // Create block with tagged payload
    const blockIdAndBlock = await client.buildAndPostBlock(
      secretManager,
      options,
    );

    console.log(`Block sent: ${EXPLORER_URL}/block/${blockIdAndBlock[0]}`);

    const fetchedBlock = await client.getBlock(blockIdAndBlock[0]);
    console.log('Block data: ', fetchedBlock);

    if (fetchedBlock.payload instanceof TaggedDataPayload) {
      const payload = fetchedBlock.payload;
      console.log('Decoded data:', hexToUtf8(payload.data));
    }
  } catch (error) {
    console.error('Error: ', error);
  }
}

run().then(() => process.exit());
