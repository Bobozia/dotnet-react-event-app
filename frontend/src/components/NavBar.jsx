import { useContext, useEffect, useState } from "react";
import NavBarButton from "./NavBarButton";
import { UserContext } from "../contexts/UserContext";
import { getUserId } from "../api/user";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  //const [userName, setUserName] = useState("");

  useEffect(() => {
    authorize();
  }, []);

  const authorize = async () => {
    if (localStorage.getItem("userName") === null) return false;
    const response = await getUserId();
    if (response.success) {
      setUser({ userName: localStorage.getItem("userName"), id: response.id });
      console.log(user);
      return true;
    }
    window.location.reload();
    localStorage.removeItem("userName");
  };

  return (
    <div className="fixed inset-x-0 bg-gray-800 text-slate-300">
      <div className="flex justify-center items-center gap-6 text-2xl">
        <NavBarButton destination="/" title="Home" />
        <NavBarButton destination="/login" title="Login" />
        <NavBarButton destination="/register" title="Register" />
        <NavBarButton destination="/events" title="Events" />
      </div>
    </div>
  );
}

export default NavBar;
