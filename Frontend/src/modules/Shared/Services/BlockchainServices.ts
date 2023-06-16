import { ethers, Contract, Provider } from "ethers";
import DatasetAbi from "@abi/Dataset.json";

//@ts-ignore
let provider: Provider;

//@ts-ignore
export const ConnectToWeb3 = async (tokenId: number) => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const url =
    "https://stupefied-dijkstra:slang-dealer-xerox-karate-moody-item@nd-142-415-280.p2pify.com/rpc/v1";
  provider = new ethers.JsonRpcProvider(url);
};

export const getDataset = async (tokenId: number) => {
  await ConnectToWeb3(tokenId);

  // Create a contract

  const contract = await new Contract(
    "0x09Ec1581C9eE71A03cfc1BFD8264ea729736a873",
    [...DatasetAbi],
    provider
  );

  //token uri
  // const tokenUri = await contract.tokenUri(tokenId);

  await contract.getFunction("tokenUri").call(null);
};
