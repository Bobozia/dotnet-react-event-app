import React, { useContext, useEffect, useState } from "react";
import { login } from "../api/user";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setError("Please enter username and password");
      return;
    }
    try {
      const result = await login(userName, password);
      setUser({ userName: userName, id: result.data.id });
      localStorage.setItem("userName", userName);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user.id !== null) {
      navigate("/");
    }
  }, [user]);

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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 rounded-md focus:outline-none hover:bg-slate-100 w-[100%]"
        />
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="submit"
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
