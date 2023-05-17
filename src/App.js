import { useSelector } from "react-redux";
import { selectUserData } from "./redux/reducers/users";
import {
  clientRoute,
  deliveryRoute,
  restaurantRoute,
  unLoginRoute,
} from "./routes/Routes";
import { Route, Routes } from "react-router";
import Error from "./Components/Pages/Error/Error";
import MainLayout from "./Components/Layouts/MainLayout";
import Register from "./Components/Pages/Register/Register";
import { useCookies } from "react-cookie";

const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : {};
};

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_data"]);

  const getUserDataFromCookie = () => {
    return cookies["user_data"] ? cookies["user_data"] : {};
  };

  const user = getUserDataFromCookie() || getDataFromLocalStorage();
  const userData = useSelector(selectUserData);

  const expiredAt = new Date(user.exp * 1000) || new Date(userData.exp * 1000);

  const isExpired = new Date() > expiredAt || true;

  // console.log(expiredAt);

  return (
    <Routes>
      {restaurantRoute.map((route) => (
        <Route
          exact
          key={route.path}
          path={route.path}
          element={route.component}
        />
      ))}
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
      {clientRoute.map((route) => (
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
