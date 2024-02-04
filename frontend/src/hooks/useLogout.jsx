import { logout as logoutUser } from "../api/user";
import { useAuthContext } from "./useAuthContext";
export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    const res = await logoutUser();

    if (res.data.success) {
      localStorage.removeItem("userName");
      dispatch({ type: "LOGOUT" });
    }
  };

  return { logout };
};
