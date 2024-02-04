import { createContext, useReducer, useEffect } from "react";
import { getUserId as getId } from "../api/user";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: {
      userName: localStorage.getItem("userName") || null,
      id: null,
    },
    isLoading: true,
  });

  useEffect(() => {
    const fetchUserIdAndLogin = async () => {
      dispatch({ type: "LOADING" });
      const userName = localStorage.getItem("userName");
      if (userName) {
        const res = await getId();
        if (res.data.success) {
          const id = res.data.userId;
          dispatch({ type: "LOGIN", payload: { userName, id } });
        }
      } else {
        dispatch({ type: "LOGOUT" });
      }
    };

    fetchUserIdAndLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
