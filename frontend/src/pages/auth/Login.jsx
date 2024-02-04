import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (user?.id) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userName, password);
  };

  return (
    <div className="h-full w-full pt-16 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[13%]"
      >
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mb-2 rounded-md focus:outline-none hover:bg-slate-100 w-[100%]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 rounded-md focus:outline-none hover:bg-slate-100 w-[100%]"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="submit"
          disabled={isLoading}
          className="mb-2 px-4 py-1 border-slate-400 border-2 font-semibold hover:bg-slate-800 text-slate-200"
          value="Log In"
        />
      </form>
      <Link to="/register" className="text-slate-200 hover:text-slate-300">
        Don't have account yet? Register by clicking here!
      </Link>
    </div>
  );
}

export default Login;
