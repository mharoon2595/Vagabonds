import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Example from "./Dropdown";

const NavLinks = ({ onClick, sidebar }) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="sm:flex gap-2" onClick={onClick}>
      <li className="sm:my-auto m-2 p-2 sm:m-1 sm:p-2 maxWidth text-lg sm:text-[1.85vw] lg:text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "p-1 bg-yellow-400 border border-black rounded-lg " : ""
          }
          style={{
            whiteSpace: "nowrap",
          }}
        >
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li className="my-auto sm:my-auto mx-2 p-2 maxWidth sm:m-1 sm:p-2 text-lg sm:text-[1.85vw] lg:text-lg">
          <NavLink
            to={`/${auth.userId}/places`}
            className={({ isActive }) =>
              isActive
                ? "p-1 bg-yellow-400 border border-black rounded-lg "
                : ""
            }
            style={{
              whiteSpace: "nowrap",
            }}
          >
            MY PLACES
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className="my-auto sm:my-auto mx-2 p-2 maxWidth sm:m-1 sm:p-2 text-lg sm:text-[1.85vw] lg:text-lg">
          <NavLink
            to="/places/new"
            className={({ isActive }) =>
              isActive
                ? "p-1  bg-yellow-400 border border-black rounded-lg "
                : ""
            }
            style={{
              whiteSpace: "nowrap",
            }}
          >
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li className="my-auto sm:my-auto mx-2 p-2 maxWidth sm:m-1 sm:p-2 text-lg sm:text-[1.85vw] lg:text-lg">
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              isActive
                ? "p-1  bg-yellow-400 border border-black rounded-lg "
                : ""
            }
            style={{
              whiteSpace: "nowrap",
            }}
          >
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && !sidebar && (
        <li className="my-auto p-2">
          <Example />
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
