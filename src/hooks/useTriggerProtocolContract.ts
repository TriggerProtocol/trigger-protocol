import { useProvider, useContract, useSigner } from "wagmi";
import TriggerContract from "contracts/artifacts/contracts/TriggerProtocol.sol/TriggerProtocol.json";
import { ethers } from "ethers";
export interface IPortal {
  dbThreadID: String;
  appID: Number;
}
export const useTriggerProtocolContract = () => {
  const [signer] = useSigner();
  const provider = useProvider();
  const contract = useContract({
    addressOrName: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    contractInterface: TriggerContract.abi,
    signerOrProvider: signer.data || provider,
  });
  const createPortal = async ({ dbThreadID, appID }: IPortal) => {
    const txn = await contract.createPortal(dbThreadID, appID);
    await txn.wait();
    return txn;
  };
  const joinPortal = async (portalId: Number) => {
    const txn = await contract.joinPortal(portalId);
    await txn.wait();
    return txn;
  };
  const claimXpToken = async (portalId: number, amount: string) => {
    const txn = await contract.claimXpToken(
      portalId,
      ethers.utils.parseEther(amount)
    );
    await txn.wait();
    return txn;
  };
  const mintNFT = async (portalId: number, tokenURI: string) => {
    const txn = await contract.mintNFT(portalId, tokenURI);
    await txn.wait();
    return txn;
  };
  const toggleSale = async (price: number, tokenId: Number) => {
    const txn = await contract.toggleSale(price, tokenId);
    await txn.wait();
    return txn;
  };
  const updateListingPrice = async (price: number, tokenId: Number) => {
    const txn = await contract.updateListingPrice(price, tokenId);
    await txn.wait();
    return txn;
  };
  const stake = async (portalId: number, amount: string) => {
    const txn = await contract.stake(portalId, amount);
    await txn.wait();
    return txn;
  };
  const withdraw = async (portalId: number) => {
    const txn = await contract.withdraw(portalId);
    await txn.wait();
    return txn;
  };
  return {
    contract,
    chainId: contract.provider.network?.chainId,
    createPortal,
    joinPortal,
    claimXpToken,
    mintNFT,
    toggleSale,
    updateListingPrice,
    stake,
    withdraw,
  };
};
