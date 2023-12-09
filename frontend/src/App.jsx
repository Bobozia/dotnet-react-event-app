import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <div className="bg-slate-700 h-screen w-screen">
      <Router>
        <UserProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="events" element={<h1>Events page</h1>} />
            <Route path="events/:name" element={<h1>Event page</h1>} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
