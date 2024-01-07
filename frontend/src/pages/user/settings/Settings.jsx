import { useState } from "react";
import { logout, updateUsername, updatePassword } from "../../../api/user";

function Settings() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const changeUsername = async (e) => {
    e.preventDefault();
    if (username === localStorage.getItem("userName")) return;
    try {
      const res = await updateUsername(username);
      if (res.data.success) {
        alert("You will be asked to login again with your new username");
        await logout();
        window.location.href = "/login";
      }
    } catch (err) {
      const error = err.response.data.split("\n")[0].split(": ")[1];
      setUsernameError(error);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (!passwordMatch()) return;
    try {
      const res = await updatePassword(password, newPassword);
      if (res.data.success) {
        alert("You will be asked to login again with your new password");
        await logout();
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
      setPasswordError(err.response.data.message);
    }
  };

  const passwordMatch = () => {
    return newPassword === confirm;
  };

  return (
    <div className="pt-14 h-full flex justify-center items-center text-slate-200 flex-col">
      <h1 className="text-xl">Settings</h1>
      <fieldset className="flex flex-col justify-center items-center border-2 border-slate-500 p-2">
        <legend className="px-2 text-base font-semibold">
          Change username
        </legend>
        <form
          className="flex flex-col justify-center items-center space-y-2"
          onSubmit={changeUsername}
        >
          <input
            type="text"
            className="text-black outline-none w-64"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {usernameError && (
            <span className="text-red-500">{usernameError}</span>
          )}
          <button
            type="submit"
            className="font-semibold hover:text-slate-300 border-2 border-slate-500 px-3"
          >
            Confirm
          </button>
        </form>
      </fieldset>

      <fieldset className="flex flex-col justify-center items-center border-2 border-slate-500 p-2 mt-4">
        <legend className="px-2 text-base font-semibold">
          Change password
        </legend>
        <form
          className="flex flex-col justify-center items-center space-y-2"
          onSubmit={changePassword}
        >
          <input
            type="password"
            className="text-black outline-none w-64"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Current password"
            required
          />
          <input
            type="password"
            className="text-black outline-none w-64"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder=" New password"
            required
          />
          <input
            type="password"
            className="text-black outline-none w-64"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder=" Confirm new password"
            required
          />
          {confirm && !passwordMatch() && (
            <span className="text-red-500">Passwords do not match</span>
          )}
          {passwordError && (
            <span className="text-red-500">{passwordError}</span>
          )}
          <button
            type="submit"
            className="font-semibold hover:text-slate-300 border-2 border-slate-500 px-3"
          >
            Confirm
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default Settings;
