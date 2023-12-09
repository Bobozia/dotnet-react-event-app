import { useContext, useEffect, useState } from "react";
import { login, register } from "../api/user";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordMatch()) {
      try {
        const result = await register(
          email,
          userName,
          password,
          confirmPassword
        );
        if (result.data.message === "User created successfully") {
          try {
            const res = await login(userName, password);
            setUser({ userName: userName, id: res.data.id });
            localStorage.setItem("userName", JSON.stringify(userName));
            navigate("/");
          } catch (error) {
            setError(error.response.data.message);
          }
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    } else setError("Password does not match");
  };

  const passwordMatch = () => {
    return password === confirmPassword;
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
