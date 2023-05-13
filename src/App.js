import { useSelector } from "react-redux";
import { selectUserData } from "./redux/reducers/users";
import { clientRoute, deliveryRoute, restaurantRoute } from "./routes/Routes";
import { Route, Routes } from "react-router";
import Error from "./Components/Pages/Error/Error";
import MainLayout from "./Components/Layouts/MainLayout";
import Register from "./Components/Pages/Register/Register";

const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : {};
};

function App() {
  const user = getDataFromLocalStorage();
  const userData = useSelector(selectUserData);

  console.log(user);
  console.log(userData);

  return (
    <Routes>
      {(userData.role === 1 || user.role === 1) &&
        clientRoute.map((route) => (
          <Route
            exact
            key={route.path}
            path={route.path}
            element={route.component}
          />
        ))}
      {(userData.role === 2 || user.role === 2) &&
        restaurantRoute.map((route) => (
          <Route
            exact
            key={route.path}
            path={route.path}
            element={route.component}
          />
        ))}
      {(userData.role === 3 || user.role === 3) &&
        deliveryRoute.map((route) => (
          <Route
            exact
            key={route.path}
            path={route.path}
            element={route.component}
          />
        ))}

      {restaurantRoute.map((route) => (
        <Route
          exact
          key={route.path}
          path={route.path}
          element={route.component}
        />
      ))}
      <Route
        path="/register"
        element={<MainLayout children={<Register />} />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
