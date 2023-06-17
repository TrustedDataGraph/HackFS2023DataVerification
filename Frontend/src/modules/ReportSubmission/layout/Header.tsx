import logo from "@assets/images/logo.png";
import { connectWallet, disConnectWallet } from "@modules/Shared/Services";
import { useGlobalState } from "@modules/Shared/store";

const Header = () => {
  const [connectedAddress] = useGlobalState("connectedAddress");

  const truncateAddr = (
    text: string,
    startChars: number,
    endChars: number,
    maxLength: number
  ) => {
    if (text.length > maxLength) {
      var start = text.substring(0, startChars);
      var end = text.substring(text.length - endChars, text.length);
      while (start.length + end.length < maxLength) {
        start = start + ".";
      }
      return start + end;
    }
    return text;
  };
  return (
    <div className="w-full h-[10%] flex items-center justify-between ">
      <img src={logo} alt="logo" className="h-[90%]" />
      {!connectedAddress && (
        <button
          onClick={() => connectWallet()}
          className="border-2 px-3 py-3 border-black rounded-xl bg-primaryLight font-semibold text-xl"
        >
          Connect Wallet
        </button>
      )}
      {connectedAddress && (
        <button
          onClick={() => disConnectWallet()}
          className="border-2 px-3 py-3 border-black rounded-xl  font-semibold text-xl"
        >
          {truncateAddr(connectedAddress, 4, 4, 11)}
        </button>
      )}
    </div>
  );
};

export default Header;
