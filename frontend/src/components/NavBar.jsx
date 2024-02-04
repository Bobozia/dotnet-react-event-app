import NavBarButton from "./NavBarButton";
import { useAuthContext } from "../hooks/useAuthContext";
import Dropdown from "./Dropdown";

function NavBar() {
  const { user, isLoading } = useAuthContext();

  return (
    <div className="flex flex-row fixed inset-x-0 bg-gray-800 text-slate-300">
      <div className="flex justify-center items-center gap-6 text-2xl w-[90%]">
        <NavBarButton destination="/" title="Home" />
        <NavBarButton destination="/events" title="Events" />
      </div>
      <div className="w-[10%] text-center">
        {!user?.id && !isLoading && (
          <div className="flex justify-center gap-6 h-full text-2xl w-full">
            <NavBarButton destination="/login" title="Login" />
            <NavBarButton destination="/register" title="Register" />
          </div>
        )}
        {user?.id && !isLoading && (
          <div className="flex justify-center items-center h-full font-bold text-xl">
            <span>{user.userName}</span>
            <Dropdown />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
