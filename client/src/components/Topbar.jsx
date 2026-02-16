import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "/src/assets/images/logo-white.png";
import { MdLogin } from "react-icons/md";
import { Input } from "./ui/input";
import SearchBox from "./SearchBox";
import { RouteSignIn } from "../helpers/RouteName";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center h-18 fixed w-full z-20 bg-white px-5 border-b ">
      <div className="pb-5">
        <img src={logo} alt="logo" width={180} />
      </div>
      <div className="w-[500px]">
        <SearchBox />
      </div>
      <div>
        <Button asChild className="rounded-full">
          <Link to={RouteSignIn}>
            <MdLogin />
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default Topbar;
