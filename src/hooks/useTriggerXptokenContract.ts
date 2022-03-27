import { useProvider, useContract, useSigner } from "wagmi";
import TriggerXpTokenContract from "artifacts/contracts/TriggerToken.sol/TriggerToken.json";

export const useTriggerXpTokenContract = () => {
  const [signer] = useSigner();
  const provider = useProvider();
  const contract = useContract({
    addressOrName: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    contractInterface: TriggerXpTokenContract.abi,
    signerOrProvider: signer.data || provider,
  });
  const checkTokenAllowance = async () => {
    const address = await signer.data?.getAddress();
    const TriggerProtocolAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const txn = await contract.allowance(address, TriggerProtocolAddress);
    await txn.wait();
  };
  return {
    contract,
    chainId: contract.provider.network?.chainId,
  };
};
