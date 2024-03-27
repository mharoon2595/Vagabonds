import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UserItem = ({ id, placeCount, image, name, isLoading, index }) => {
  console.log("user id--->", id);
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75 }}
    >
      {isLoading ? (
        <li>
          <div className="flex justify-center md:block">
            <div className=" m-2 p-4 w-[200px] lg:w-[300px] rounded-md h-[100px] bg-slate-300 bg-opacity-75 animate-pulse flex justify-evenly align-middle gap-1 shadow-2xl"></div>
          </div>
        </li>
      ) : (
        <li>
          <div className="flex justify-center md:block">
            <Link to={`/${id}/places`}>
              <div className=" m-2 p-4 w-[200px] lg:w-[100%] rounded-md h-auto bg-gradient-to-r from-[#74ebd5] to-[#ACB6E5] text-black hover:bg-yellow-400 hover:scale-95 hover:text-black flex justify-evenly align-middle gap-1 shadow-2xl">
                <div className="w-1/2">
                  <Avatar
                    image={`${process.env.REACT_APP_ASSET_URL}${image}`}
                  />
                </div>
                <div className="w-1/2 text-right ">
                  <h2 className="text-wrap lg:text-2xl">{name}</h2>
                  <h3 className="text-wrap lg:text-lg text-white font-bold">
                    {placeCount.length === 0 ? 0 : placeCount.length}{" "}
                    {placeCount.length === 1 ? " place" : " places"}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </li>
      )}
    </motion.div>
  );
};

export default UserItem;
