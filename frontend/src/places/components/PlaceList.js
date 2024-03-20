import React from "react";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  if (props.item.length === 0) {
    return (
      <div className=" flex justify-center">
        <div className="m-2 p-4 w-[300px] rounded-md h-auto bg-gray-700 text-yellow-400 flex flex-col gap-1 shadow-2xl">
          <h2 className="text-2xl text-center">
            No places found. Maybe create one?
          </h2>
          <button className="hover:text-blue-400  ">Share place</button>
        </div>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.item.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          name={place.name}
          description={place.description}
          image={place.imageUrl}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
