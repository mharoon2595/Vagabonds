import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = ({ onClick }) => {
  return (
    <ul className="sm:flex" onClick={onClick}>
      <li className="m-2 p-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "p-1 bg-yellow-400 border border-black rounded-lg" : ""
          }
        >
          ALL USERS
        </NavLink>
      </li>
      <li className="m-2 p-2">
        <NavLink
          to="/u1/places"
          className={({ isActive }) =>
            isActive ? "p-1 bg-yellow-400 border border-black rounded-lg" : ""
          }
        >
          MY PLACES
        </NavLink>
      </li>
      <li className="m-2 p-2">
        <NavLink
          to="/places/new"
          className={({ isActive }) =>
            isActive ? "p-1 bg-yellow-400 border border-black rounded-lg" : ""
          }
        >
          ADD PLACE
        </NavLink>
      </li>
      <li className="m-2 p-2">
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            isActive ? "p-1 bg-yellow-400 border border-black rounded-lg" : ""
          }
        >
          AUTHENTICATE
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
