import { useProvider, useContract, useSigner } from "wagmi";
import TriggerTokenContract from "artifacts/contracts/TriggerToken.sol/TriggerToken.json";

export const useTriggerTokenContract = () => {
  const [signer] = useSigner();
  const provider = useProvider();
  const contract = useContract({
    addressOrName: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    contractInterface: TriggerTokenContract.abi,
    signerOrProvider: signer.data || provider,
  });

  return {
    contract,
    chainId: contract.provider.network?.chainId,
  };
};
