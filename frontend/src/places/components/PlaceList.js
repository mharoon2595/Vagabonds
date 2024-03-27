import React, { useContext, useState } from "react";
import PlaceItem from "./PlaceItem";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

const PlaceList = (props) => {
  const auth = useContext(AuthContext);

  if (props.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <PlaceItem isLoading={props.isLoading} />
        <PlaceItem isLoading={props.isLoading} />
      </div>
    );
  }

  console.log("UserId comparison--->", props.userId, auth.userId);
  console.log("places after deletion--->", props.item);

  if (!props.item || props.item.places.length === 0) {
    return (
      <div className=" flex justify-center">
        <div className="m-2 p-4 w-[300px] rounded-md h-auto bg-gray-700 text-yellow-400 flex flex-col gap-1 shadow-2xl">
          {props.userId === auth.userId ? (
            <>
              <h2 className="text-2xl text-center">
                No places found. Maybe create one?
              </h2>
              <button className="`p-[2px] sm:p-2  border-2 border-green-500 bg-green-200 rounded-lg text-black">
                <Link to="/places/new">Share place</Link>
              </button>
            </>
          ) : (
            <h2 className="text-2xl text-center">
              This adventurer is yet to add places.
            </h2>
          )}
        </div>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.item.places.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          userId={props.userId}
          name={place.title}
          description={place.description}
          image={place.image}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          deletionHandler={props.deletionHandler}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
