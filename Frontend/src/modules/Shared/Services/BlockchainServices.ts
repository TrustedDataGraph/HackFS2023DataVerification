import { ethers } from "ethers";
import DatasetAbi from "@abi/Dataset.json";

//@ts-ignore
let provider: any;

//@ts-ignore
export const ConnectToWeb3 = async () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const url = "https://api.calibration.node.glif.io/rpc/v1";
  // provider = new ethers.JsonRpcProvider(url);
  provider = new ethers.providers.JsonRpcProvider(url);
};

export const getDataset = async (tokenId: number) => {
  await ConnectToWeb3();

  // Create a contract

  const contract = new ethers.Contract(
    "0x09Ec1581C9eE71A03cfc1BFD8264ea729736a873",
    DatasetAbi,
    provider
  );

  const tokenUri = await contract.functions.tokenURI(tokenId);
  //console.log(tokenUri);
  return tokenUri;
};
