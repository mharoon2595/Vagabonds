import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar";
import { Link } from "react-router-dom";

const UserItem = ({ id, placeCount, image, name }) => {
  return (
    <li>
      <div className=" flex justify-center">
        <Link to={`/${id}/places`}>
          <div className=" m-2 p-4 w-[300px] rounded-md h-auto bg-gray-700 text-yellow-400 hover:bg-yellow-400 hover:text-black flex justify-evenly align-middle gap-1 shadow-2xl">
            <div>
              <Avatar image={image} />
            </div>
            <div>
              <h2 className="text-2xl hover:text-black">{name}</h2>
              <h3 className="text-lg text-white font-bold">
                {placeCount} {placeCount === 1 ? "place" : "places"}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default UserItem;
