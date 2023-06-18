import { Link } from "react-router-dom";
import logo from "@assets/images/logo.png";

const Header = () => {
  return (
    <div className="w-full h-[10%] flex items-center">
      <Link to={`/dataset/`}>
      <img src={logo} alt="logo" className="h-[90%]" />
      <h1 className="font-bold text-lg h-[10%] pl-2">
        Filecoin Data Verification
      </h1>
      </Link>
    </div>
  );
};

export default Header;
