import React, { useContext, useState } from "react";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrops from "../UIElements/Backdrops";
import Example from "./Dropdown";
import { AuthContext } from "../../context/auth-context";

const MainNavigation = () => {
  const [sidebar, setSidebar] = useState(false);
  const auth = useContext(AuthContext);

  return (
    <>
      {sidebar && (
        <Backdrops
          onClick={() => {
            setSidebar(false);
          }}
        />
      )}
      <SideDrawer
        show={sidebar}
        onClick={() => {
          setSidebar(false);
        }}
      />
      <div className="bg-white min-w-[330px] ">
        <MainHeader>
          <div className="  flex justify-between align-bottom ">
            <div className="flex flex-row-reverse gap-2 sm:hidden my-auto">
              {auth.isLoggedIn && (
                <div className="my-auto p-1">
                  <Example />
                </div>
              )}
              <div
                className=" my-auto mx-1 p-1 flex flex-col justify-between align-middle w-[40px] h-[30px] cursor-pointer"
                onClick={() => {
                  setSidebar(true);
                }}
              >
                <div className="w-full h-[3px] bg-black" />
                <div className="w-full h-[3px] bg-black" />
                <div className="w-full h-[3px] bg-black" />
              </div>
            </div>

            <h1
              className=" my-auto mx-2 p-2 text-lg sm:text-[3vw] lg:text-2xl text-black italic "
              style={{ fontFamily: "Segoe Script" }}
            >
              <Link to="/">AdventurersAssemble</Link>
            </h1>

            <nav className="hidden sm:flex">
              <NavLinks />
            </nav>
          </div>
        </MainHeader>
      </div>
    </>
  );
};

export default MainNavigation;
