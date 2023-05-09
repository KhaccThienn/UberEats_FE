import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/Layouts/MainLayout";
import Login from "./Components/Pages/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<MainLayout children={<Login />} />}  />
    </Routes>
  );
}

export default App;
