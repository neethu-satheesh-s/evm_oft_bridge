// import { ChainId, CHAIN_STAGE, LZ_ADDRESS, ChainStage } from "@layerzerolabs/core-sdk"
// import * as crossChainHelper from '../tasks/utils/crossChainHelper';

const { run } = require('hardhat');
const verify = async (contractAddress, args, contractName) => {
  console.log('Verifying Contract.......');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
      contract: `contracts/${contractName}.sol:${contractName}`,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified');
    } else {
      console.log(e);
    }
  }
};

module.exports = async function ({
  ethers,
  deployments,
  getNamedAccounts,
  network,
}) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(deployer);
  //   if (crossChainHelper.FORKING) {
  //     const provider = await crossChainHelper.getProvider(network.name);
  //     await provider.send('hardhat_impersonateAccount', [deployer]);
  //     await provider.send('hardhat_setBalance', [
  //       deployer,
  //       '0x1000000000000000000000000000000000000000000000000000000000000000',
  //     ]);
  //   }

  //   console.log(`Network: ${network.name}`);

  //   const name = network.name.replace('-fork', '');

  //   const address = LZ_ADDRESS[name] ?? ethers.constants.AddressZero;
  //   console.log(`Network: ${name}, Endpoint Address: ${address}`);

  //   let aptosId;
  //   switch (CHAIN_STAGE[name]) {
  //     case ChainStage.MAINNET:
  //       aptosId = ChainId.APTOS;
  //       break;
  //     case ChainStage.TESTNET:
  //       aptosId = ChainId.APTOS_TESTNET;
  //       break;
  //     case ChainStage.TESTNET_SANDBOX:
  //       aptosId = ChainId.APTOS_TESTNET_SANDBOX;
  //       break;
  //     default:
  //       throw new Error('Invalid chain stage');
  //   }
  //   console.log(`Aptos Id: ${aptosId}`);

  // args:
  //   address _layerZeroEndpoint,
  //   uint16 _aptosChainId
  const args = ['0x6fcb97553d41516cb228ac03fdc8b9a0a9df04a1', 108];

  const contract = await deploy('TokenBridge', {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 1,
  });

  //   console.log('contract');
  //   console.log(contract);

  await verify(contract.address, args, 'TokenBridge');

  //   console.log('constructor args:' + contract.interface.encodeDeploy(args));
};

module.exports.tags = ['TokenBridge'];
