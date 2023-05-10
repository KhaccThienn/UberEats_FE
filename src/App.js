import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/Layouts/MainLayout";
import Login from "./Components/Pages/Login/Login";
import Register from "./Components/Pages/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<MainLayout children={<Login />} />}  />
      <Route path="/register" element={<MainLayout children={<Register />} />}  />
    </Routes>
  );
}

export default App;
