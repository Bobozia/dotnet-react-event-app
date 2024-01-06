import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Events from "./pages/event/Events";
import Event from "./pages/event/Event";
import CreateEvent from "./pages/event/createEvent";
import UpdateEvent from "./pages/event/updateEvent";

function App() {
  return (
    <div className="bg-slate-700 h-screen w-screen">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:name" element={<Event />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="events/:name/update" element={<UpdateEvent />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
