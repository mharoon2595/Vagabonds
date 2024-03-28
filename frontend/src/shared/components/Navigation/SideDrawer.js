import React from "react";
import NavLinks from "./NavLinks";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { motion, AnimatePresence } from "framer-motion";

const SideDrawer = ({ onClick, sidebar }) => {
  const drawer = (
    // <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed z-[100] h-full minWidth w-[50%]  bg-slate-500 sm:hidden "
    >
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
      <NavLinks sidebar={sidebar} onClick={onClick} />
    </motion.div>
  );

  return ReactDOM.createPortal(drawer, document.getElementById("drawer-hook"));
};

export default SideDrawer;
