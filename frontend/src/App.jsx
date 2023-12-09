import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <div className="bg-slate-700 h-screen w-screen">
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="login" element={<h1>Login page</h1>} />
            <Route path="register" element={<h1>Register page</h1>} />
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
