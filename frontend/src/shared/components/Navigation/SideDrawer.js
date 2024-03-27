import React from "react";
import NavLinks from "./NavLinks";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

const SideDrawer = ({ onClick, show }) => {
  const drawer = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <div className="absolute z-[100] h-full minWidth w-[50%]  bg-slate-500 sm:hidden ">
        <div className=" p-2 flex justify-between">
          <div className="max-w-[75%] text">
            <p
              className="font-bold break-words text-white"
              style={{ fontFamily: "Segoe Script" }}
            >
              MENU
            </p>
          </div>
          <div className="hover:scale-125 cursor-pointer" onClick={onClick}>
            X
          </div>
        </div>
        <NavLinks sidebar onClick={onClick} />
      </div>
    </CSSTransition>
  );

  return ReactDOM.createPortal(drawer, document.getElementById("drawer-hook"));
};

export default SideDrawer;
