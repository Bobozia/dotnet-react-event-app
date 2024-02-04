import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { login as loginUser } from "../api/user";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, userName) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(email, userName);
      if (response.data.success) {
        let payload = {
          id: response.data.id,
          userName: response.data.userName,
        };
        dispatch({ type: "LOGIN", payload: payload });
        localStorage.setItem("userName", payload.userName);
        navigate("/");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      console.log("error", errors);
      let errorMessage = "";
      for (let key in errors) {
        errorMessage += errors[key].join(" ");
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
