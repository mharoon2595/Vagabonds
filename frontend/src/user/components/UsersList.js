import React from "react";
import UserItem from "./UserItem";

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
  if (props.items.length === 0) {
    return (
      <div className="m-2 p-2 text-center text-xl">
        <h2>No users found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="text-center p-2 m-2 text-xl">
        Total number of users: {props.items.Users.length}
      </div>
      <ul className="relative w-[50%] lg:w-[58%] left-[25%] lg:left-[25%] md:grid md:grid-cols-2 md:gap-8">
        {props.items.Users.map((user) => (
          <UserItem
            key={user._id}
            id={user._id}
            image={user.image}
            name={user.name}
            placeCount={user.places}
          />
        ))}
      </ul>
    </>
  );
};

export default UsersList;
