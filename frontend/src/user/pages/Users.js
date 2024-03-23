import React, { useEffect, useState, useCallback } from "react";
import UsersList from "../components/UsersList";
import swal from "sweetalert";

const Users = () => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("loading--->", isLoading);

  const getUsers = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const resUsers = await response.json();
      console.log(resUsers);
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
    <div>
      <UsersList isLoading={isLoading} items={usersList} />
    </div>
  );
};

export default Users;
