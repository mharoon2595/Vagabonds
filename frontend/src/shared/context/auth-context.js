import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  placeIdArray: null,
  placeId: null,
  userName: null,
  login: () => {},
  logout: () => {},
  setPlaceId: () => {},
});
