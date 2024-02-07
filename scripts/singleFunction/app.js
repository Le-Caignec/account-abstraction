import { IExec, utils } from "iexec";

const createAppFor = async (owner, rpc) => {
  const appOwnerWallet = process.env.WALLET_AA;
  const iexecAppOwner = new IExec({
    ethProvider: utils.getSignerFromPrivateKey(rpc, appOwnerWallet),
  });
  const { address: appAddress, txHash } = await iexecAppOwner.app.deployApp({
    owner,
    name: `test app${Date.now()}`,
    type: "DOCKER",
    multiaddr: "registry.hub.docker.com/iexechub/vanityeth:1.1.1",
    checksum:
      "0x00f51494d7a42a3c1c43464d9f09e06b2a99968e3b978f6cd11ab3410b7bcd14",
  });
  await ethers.provider.waitForTransaction(txHash);

  return appAddress;
};

export { createAppFor };
