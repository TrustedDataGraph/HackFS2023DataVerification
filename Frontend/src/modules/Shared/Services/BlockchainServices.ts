import { ethers } from "ethers";

//@ts-ignore
export const Connector = async () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  var urlInfo = {
    url: "https://nd-142-415-280.p2pify.com/rpc/v1",
    user: "stupefied-dijkstra",
    password: "slang-dealer-xerox-karate-moody-item",
  };
  const NETWORK_ID = 314159;

  const provider = new ethers.providers.JsonRpcProvider(urlInfo, NETWORK_ID);

  // MetaMask requires requesting permission to connect users accounts
  //await provider.send("eth_requestAccounts", []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.

  const signer = await provider.getSigner();
};
