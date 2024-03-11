import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import ContactDetails from "./pages/ContactDetails";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact-details/:id" element={<ContactDetails />} />
      </Routes>
    </div>
  );
};
export default App;
