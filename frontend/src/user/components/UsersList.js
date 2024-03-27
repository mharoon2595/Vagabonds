import React from "react";
import UserItem from "./UserItem";
import { motion } from "framer-motion";

const UsersList = (props) => {
  console.log("loading from usersList--->", props.isLoading);
  console.log("loading from usersList--->", props.items.Users);

  if (props.isLoading) {
    return (
      <ul className="relative w-[50%] lg:w-[58%] left-[25%] lg:left-[25%] md:grid md:grid-cols-2 md:gap-8">
        <UserItem isLoading={props.isLoading} />
        <UserItem isLoading={props.isLoading} />
        <UserItem isLoading={props.isLoading} />
        <UserItem isLoading={props.isLoading} />
        <UserItem isLoading={props.isLoading} />
        <UserItem isLoading={props.isLoading} />
      </ul>
    );
  }
  if (!props.items || props.items.Users.length === 0) {
    return (
      <div className="m-2 p-2 text-center text-xl">
        <h2>No users found at the moment.</h2>
        <h2>
          Please head over to the 'Authenticate' tab to create a new user.
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="text-center p-2 m-2 text-xl">
        Total number of users: {props.items.Users.length}
      </div>
      <ul className="relative w-[50%] lg:w-[50%] left-[25%] lg:left-[25%] md:grid md:grid-cols-2 md:gap-8">
        {props.items.Users.map((user, index) => (
          <UserItem
            key={user._id}
            id={user._id}
            image={user.image}
            name={user.name}
            placeCount={user.places}
            index={index}
          />
        ))}
      </ul>
    </>
  );
};

export default UsersList;
