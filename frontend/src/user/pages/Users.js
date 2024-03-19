import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Miles",
      image:
        "https://pyxis.nymag.com/v1/imgs/5ff/9bc/6098962edd260c49d52d4b2b58d4df0b62-13-miles-morales-lede.rhorizontal.w700.jpg",
      places: 3,
    },
  ];

  return (
    <div>
      <UsersList items={USERS} />
    </div>
  );
};

export default Users;
