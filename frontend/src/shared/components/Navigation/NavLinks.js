import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Example from "./Dropdown";

const NavLinks = ({ onClick, sidebar }) => {
  const auth = useContext(AuthContext);

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
      {auth.isLoggedIn && (
        <li className="m-2 p-2">
          <NavLink
            to={`/${auth.userId}/places`}
            className={({ isActive }) =>
              isActive ? "p-1 bg-yellow-400 border border-black rounded-lg" : ""
            }
          >
            MY PLACES
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
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
      )}
      {!auth.isLoggedIn && (
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
      )}
      {auth.isLoggedIn && !sidebar && (
        <li className="my-auto p-1   ">
          <Example />
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
