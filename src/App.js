import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/Layouts/MainLayout";
import Login from "./Components/Pages/Login/Login";
import Register from "./Components/Pages/Register/Register";
import jwt_decode from "jwt-decode";

function App() {
  const getToken = () => {
    const token = localStorage.getItem("access_token");
    return token.toString();
  };

  const decoded = jwt_decode(getToken());
  
  console.log(decoded);
  // idea:
  // const clientRoute = [
  //   {
  //     path: "/",
  //     elelemt: <Login />,
  //   },

  // ];
  return (
    <Routes>
      <Route path="/login" element={<MainLayout children={<Login />} />} />
      <Route
        path="/register"
        element={<MainLayout children={<Register />} />}
      />
    </Routes>
  );
}

export default App;
