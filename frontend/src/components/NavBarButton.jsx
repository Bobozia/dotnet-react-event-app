import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavBarButton({ destination, title }) {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsActive(false);
    if (location.pathname === destination) setIsActive(true);
  }, [location]);
  return (
    <Link
      to={destination}
      className={`no-underline py-2 border-b-2  hover:text-slate-200 hover:border-slate-200 ${
        isActive ? "border-slate-200 text-slate-100" : "border-slate-800"
      }`}
    >
      {title}
    </Link>
  );
}

export default NavBarButton;
