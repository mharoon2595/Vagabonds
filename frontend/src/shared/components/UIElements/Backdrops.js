import React from "react";
import ReactDOM from "react-dom";

const Backdrops = (props) => {
  const backdrop = (
    <div
      className={
        props.viewMap
          ? "fixed bg-black opacity-75 z-50 h-full w-full"
          : "fixed bg-black opacity-75 z-50 h-full w-full sm:hidden"
      }
      onClick={props.onClick}
    ></div>
  );

  return ReactDOM.createPortal(
    backdrop,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrops;
