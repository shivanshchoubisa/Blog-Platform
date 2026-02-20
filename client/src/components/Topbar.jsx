import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "/src/assets/images/logo-white.png";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import userIcon from "@/assets/images/user.png";
import { RouteIndex, RouteProfile, RouteSignIn } from "../helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeUser } from "@/redux/user/user.slice";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";

const Topbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
            {
              method: "get",
              credentials: "include",
            },
          );
          const data = await response.json();
          if (!response.ok) {
            return showToast("error", data.message);
          }
          dispatch(removeUser())
          navigate(RouteIndex);
          showToast("success", data.message);
        } catch (error) {
          showToast("error", error.message);
        }
  }
  return (
    <div className="flex justify-between items-center h-18 fixed w-full z-20 bg-white px-5 border-b ">
      <div className="pb-5">
        <img src={logo} alt="logo" width={180} />
      </div>
      <div className="w-[500px]">
        <SearchBox />
      </div>
      <div>
        {!user.isLoggedIn ? (
          <Button asChild className="rounded-full">
            <Link to={RouteSignIn}>
              <MdLogin />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={user.user.avatar || userIcon} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <p>{user.user.name}</p>
                  <p className="text-sm">{user.user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to={RouteProfile}>
                    <FaRegUser />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="">
                    <FaPlus />
                    Create Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Button variant="ghost" className='w-full text-start' onClick={handleLogout}>
                    <HiOutlineLogout color="red" />
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
export default Topbar;
