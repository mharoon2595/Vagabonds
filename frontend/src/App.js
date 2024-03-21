import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import ErrorElement from "./utils/ErrorElement";
import { Outlet } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlaces from "./places/pages/UpdatePlaces";
import AuthLogin from "./user/pages/AuthLogin";
import AuthNewUser from "./user/pages/AuthNewUser";
import { AuthContext } from "./shared/context/auth-context";
import { useCallback, useState } from "react";

const AppLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <MainNavigation />
        <Outlet />
      </AuthContext.Provider>
    </>
  );
};

const route = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Users />,
      },
      { path: "/places/new", element: <NewPlaces /> },
      { path: "/places/:placeId", element: <UpdatePlaces /> },
      { path: "/:userId/places", element: <UserPlaces /> },
      { path: "/auth/new", element: <AuthNewUser /> },
      { path: "/auth", element: <AuthLogin /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
