import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Home() {
  const { user } = useContext(UserContext);
  return (
    <div className="h-full w-full pt-16">
      <div className="">
        <span className="">Ja ipsum</span>
        <br />
      </div>
    </div>
  );
}

export default Home;
