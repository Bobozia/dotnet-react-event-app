import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { register as registerUser } from "../api/user";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const passwordMatch = (password, confirmPassword) => {
    return password && confirmPassword && password === confirmPassword;
  };

  const register = async (email, userName, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    // if (!passwordMatch(password, confirmPassword)) {
    //   setIsLoading(false);
    //   setError("Password does not match");
    //   return;
    // }

    try {
      const response = await registerUser(
        email,
        userName,
        password,
        confirmPassword
      );
      //username at least 4 characters,
      //passwords should match,
      //password require digit, lowercase, nonalphanumeric, uppercase, required length 6, required unique chars 1
      //email should be valid
    } catch (err) {
      const errors = err.response.data.errors;
      let errorMessage = "";
      for (let key in errors) {
        errorMessage += errors[key].join(" ");
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
