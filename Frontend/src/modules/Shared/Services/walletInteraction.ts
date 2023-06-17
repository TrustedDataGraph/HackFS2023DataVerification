//communication with blockchain enters here
// import Web3 from "web3";

import { toast } from "react-hot-toast";
import { setGlobalState } from "../store";

//@ts-ignore
const { ethereum } = window;
// window.web3 = new Web3(ethereum);
// window.web3 = new Web3(window.web3.currentProvider);

export const verifyNetwork = () => {
  //@ts-ignore
  if (window.ethereum.networkVersion != 314159)
    toast.error("Please switch to Filecoin calibration test network.");
};

const createFilecoincalbrationNetwork = async () => {
  try {
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x4cb2f",
          chainName: "Filecoin - Calibration testnet",
          rpcUrls: ["https://filecoin-calibration.chainup.net/rpc/v1"],
          blockExplorerUrls: [],
          nativeCurrency: {
            symbol: "tFIL",
            decimals: 18,
          },
        },
      ],
    });

    toast("Welcome to Filecoin, please connect wallet ", {
      icon: "👏😯",
    });
  } catch (err) {
    console.log(err);
  }
};

const switchUserChain = async () => {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x4cb2f" }],
    });
    toast.success("Network switched, please connect wallet");
  } catch (switchError) {
    //@ts-ignore
    //The network has not been added to MetaMask
    if (switchError.code === 4902) {
      toast("oops! Filecoin network not found, let's create it... ", {
        icon: "😯",
      });

      createFilecoincalbrationNetwork();
    }
    //console.log(switchError);
  }
};

export const connectWallet = async () => {
  //@ts-ignore
  if (window.ethereum.networkVersion != 314159) {
    toast("oops! Wrong network detected, switching to Filecoin... ", {
      icon: "😯",
    });
    switchUserChain();
    return;
  }
  try {
    if (!ethereum) toast.error("Please install Metamask");
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    setGlobalState("connectedAddress", accounts[0].toLowerCase());
  } catch (error) {
    console.log(error);
  }
};
export const disConnectWallet = async () => {
  setGlobalState("connectedAddress", "");
};

export const isWallectConnected = async () => {
  try {
    if (!ethereum) return toast.error("Metamask not installed,");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // window.ethereum.on("chainChanged", (chainId) => {
    //   window.location.reload();
    // });
    // //console.log(accounts);
    // window.ethereum.on("accountsChanged", async () => {
    //   setGlobalState("connectedAccount", accounts[0].toLowerCase());
    //   await isWallectConnected();
    // });

    if (accounts.length) {
      setGlobalState("connectedAddress", accounts[0].toLowerCase());
      //store.setUser({ walletAddress: accounts[0].toLowerCase() });
    } else {
      setGlobalState("connectedAddress", "");
      // store.removeUser();
    }
  } catch (error) {
    console.log(error);
  }
};
