import React, { useEffect, useState, useCallback } from "react";
import UsersList from "../components/UsersList";
import swal from "sweetalert";

const Users = () => {
  const [usersList, setUsersList] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("loading--->", isLoading);
  console.log(
    "USERS ASSEMBLE-->",
    process.env.REACT_APP_BACKEND_URL + "/users"
  );

  const getUsers = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/users"
      );
      const resUsers = await response.json();

      setIsLoading(false);
      setUsersList(resUsers);
    } catch (err) {
      setIsLoading(false);
      await swal("An error occured", `${err.message}`, "error");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getUsers();
  }, []);

  console.log("USERS LIST--->", usersList);

  return (
    <div className="min-w-[330px]">
      <UsersList isLoading={isLoading} items={usersList} />
    </div>
  );
};

export default Users;
