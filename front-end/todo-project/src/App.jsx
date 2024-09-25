import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ChangeUserDetails from "./components/ChangeUserDetails";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/register" element={<RegisterForm />} />
        <Route exact path="/updateuser" element={<ChangeUserDetails />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
