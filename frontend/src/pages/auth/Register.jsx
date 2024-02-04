import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { useAuthContext } from "../../hooks/useAuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, error, isLoading } = useRegister();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  //make one variable as Form and use it as an object
  if (user?.id) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(email, userName, password, confirmPassword);
  };

  return (
    <div className="h-full w-full pt-16 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[13%]"
      >
        <input
          type="email"
          placeholder="Email"
          className="mb-2 rounded-md focus:outline-none hover:bg-slate-100 w-[100%]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="mb-2 rounded-md focus:outline-none hover:bg-slate-100 w-[100%]"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-2 rounded-md focus:outline-none hover:bg-slate-100 w-[100%]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="mb-2 rounded-md focus:outline-none hover:bg-slate-100 w-[100%]"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          disabled={isLoading}
          type="submit"
          className="mb-2 px-4 py-1 border-slate-400 border-2 font-semibold hover:bg-slate-800 text-slate-200"
        >
          Sign up
        </button>
      </form>
      <Link to="/login" className="text-slate-200 hover:text-slate-300">
        Already have an account? Log in by clicking here!
      </Link>
    </div>
  );
}

export default Register;
