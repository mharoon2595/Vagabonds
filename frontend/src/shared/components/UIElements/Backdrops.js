import React from "react";
import ReactDOM from "react-dom";

const Backdrops = ({ onClick }) => {
  const backdrop = (
    <div
      className="fixed bg-black opacity-75 z-50 h-full w-full sm:hidden"
      onClick={onClick}
    ></div>
  );

  return ReactDOM.createPortal(
    backdrop,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrops;
