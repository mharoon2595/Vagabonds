import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import ErrorElement from "./utils/ErrorElement";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlaces from "./places/pages/UpdatePlaces";
import AuthLogin from "./user/pages/AuthLogin";
import AuthNewUser from "./user/pages/AuthNewUser";
import { AuthContext } from "./shared/context/auth-context";
import { useCallback, useState } from "react";
import AppLayout from "./AppLayout";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const login = useCallback((uid, username, id) => {
    setUserId(uid);
    setIsLoggedIn(true);
    setUserName(username);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserName(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login: login,
        logout: logout,
        userId: userId,
        userName: userName,
      }}
    >
      <RouterProvider router={route} />
    </AuthContext.Provider>
  );
}

export default App;
