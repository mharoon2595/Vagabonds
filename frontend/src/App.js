import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./user/pages/Users";
// import NewPlaces from "./places/pages/NewPlaces";
// import ErrorElement from "./utils/ErrorElement";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlaces from "./places/pages/UpdatePlaces";
import AuthLogin from "./user/pages/AuthLogin";
import AuthNewUser from "./user/pages/AuthNewUser";
import { AuthContext } from "./shared/context/auth-context";
import { Suspense, useCallback, useEffect, useState } from "react";
import AppLayout from "./AppLayout";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const NewPlaces = React.lazy(() => import("./places/pages/NewPlaces"));
const ErrorElement = React.lazy(() => import("./utils/ErrorElement"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlaces = React.lazy(() => import("./places/pages/UpdatePlaces"));
// const AuthLogin = React.lazy(() => import("./user/pages/AuthLogin"));
// const AuthNewUser = React.lazy(() => import("./user/pages/AuthNewUser"));

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

let logoutTimer;

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [tokenExpirationTime, setTokenExpirationTime] = useState(null);
  const [userName, setUserName] = useState("");

  const login = useCallback((uid, username, token, expirationTime) => {
    setUserId(uid);
    setUserName(username);
    const tokenExpirationDate =
      expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationTime(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        name: username,
        expiry: tokenExpirationDate.toISOString(),
      })
    );
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationTime(null);
    setUserName(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("userData"));
    if (
      localData &&
      localData.token &&
      new Date(localData.expiry) > new Date()
    ) {
      login(
        localData.userId,
        localData.name,
        localData.token,
        new Date(localData.expiry)
      );
    }
  }, []);

  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime =
        new Date(tokenExpirationTime).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationTime, logout]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login: login,
        logout: logout,
        token: token,
        userId: userId,
        userName: userName,
      }}
    >
      <Suspense
        fallback={
          <div className="center">
            <LoadingSpinner />
          </div>
        }
      >
        <RouterProvider router={route} />
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
