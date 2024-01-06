import { useContext, useEffect, useState } from "react";
import NavBarButton from "./NavBarButton";
import { UserContext } from "../contexts/UserContext";
import { getUserId } from "../api/user";
import Dropdown from "./Dropdown";

function NavBar() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    authorize();
  }, [user?.id]);

  const authorize = async () => {
    if (localStorage.getItem("userName") === null) return false;
    const response = await getUserId();
    if (response.data.success) {
      setUser({
        userName: localStorage.getItem("userName"),
        id: response.data.userId,
      });
      return true;
    }
    window.location.reload();
    localStorage.removeItem("userName");
  };

  return (
    <div className="flex flex-row fixed inset-x-0 bg-gray-800 text-slate-300">
      <div className="flex justify-center items-center gap-6 text-2xl w-[90%]">
        <NavBarButton destination="/" title="Home" />
        <NavBarButton destination="/events" title="Events" />
      </div>
      <div className="w-[10%] text-center">
        {!user?.userName && (
          <div className="flex justify-center gap-6 h-full text-2xl w-full">
            <NavBarButton destination="/login" title="Login" />
            <NavBarButton destination="/register" title="Register" />
          </div>
        )}
        {user?.userName && (
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
