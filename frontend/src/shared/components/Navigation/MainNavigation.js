import React, { useState } from "react";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrops from "../UIElements/Backdrops";

const MainNavigation = () => {
  const [sidebar, setSidebar] = useState(false);

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
      <div className="bg-white ">
        <MainHeader>
          <div className="  flex justify-between align-bottom gap-2 ">
            <div
              className="sm:hidden my-auto"
              onClick={() => {
                setSidebar(true);
              }}
            >
              <div className=" m-1 p-1 flex flex-col justify-between align-middle w-[40px] h-[30px] cursor-pointer">
                <div className="w-full h-[3px] bg-black" />
                <div className="w-full h-[3px] bg-black" />
                <div className="w-full h-[3px] bg-black" />
              </div>
            </div>

            <h1 className=" my-auto mx-2 p-2 text-2xl text-black">
              <Link to="/">YourPlaces</Link>
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
