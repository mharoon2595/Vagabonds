import React, { useContext } from "react";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";

const AppLayout = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <MainNavigation />
      <Outlet context={auth} />
    </>
  );
};

export default AppLayout;
