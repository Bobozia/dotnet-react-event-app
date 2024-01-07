import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/user";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Settings", "Logout"];
  const navigate = useNavigate();

  const renderButton = (option) => {
    switch (option) {
      case "Settings":
        return <button onClick={() => navigate("/settings")}>Settings</button>;
      case "Logout":
        return <button onClick={handleLogout}>Logout</button>;
    }
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res.data.success) {
      localStorage.removeItem("userName");
      window.location.reload();
    }
  };

  return (
    <div className="">
      <RiArrowDropDownLine
        size="1.7em"
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div
          className="absolute right-14 bg-slate-600 p-1 font-normal"
          onMouseLeave={() => setIsOpen(false)}
        >
          {options.map((option) => (
            <div
              className="flex justify-center items-center h-full text-xl w-full hover:bg-slate-700 border-b-2 px-3 py-1"
              key={option}
            >
              {renderButton(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
