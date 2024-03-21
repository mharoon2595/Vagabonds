import React, { useContext, useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

const PlaceItem = ({
  name,
  description,
  image,
  creatorId,
  address,
  coordinates,
}) => {
  const [showMap, setShowMap] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const openDeleteHandler = () => {
    setConfirmDelete(true);
  };

  const closeDeleteHandler = () => {
    setConfirmDelete(false);
  };

  const auth = useContext(AuthContext);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        footer={
          <button
            className="p-[2px] sm:p-2  border-2 border-red-600 bg-red-200 rounded-lg"
            onClick={closeMapHandler}
          >
            Close
          </button>
        }
      >
        <div className="h-[20rem] w-full">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={confirmDelete}
        onCancel={closeDeleteHandler}
        header="Are you sure?"
        delete
        footer={
          <>
            <button
              className="p-[2px] sm:p-2  border-2 border-red-600 bg-red-200 rounded-lg"
              onClick={closeDeleteHandler}
            >
              No
            </button>
            <button
              className="p-[2px] sm:p-2  border-2 border-green-500 bg-green-200 rounded-lg"
              onClick={() => console.log("deletion successful")}
            >
              Yes
            </button>
          </>
        }
      ></Modal>
      <div className=" m-2 p-2  flex justify-center">
        <div className=" flex flex-col w-[60%] sm:w-[50%] h-[400px] sm:h-[550px] justify-between bg-white rounded-lg shadow-xl">
          <img src={image} className="w-full h-[60%] rounded-t-lg" />
          <div className=" mx-2 flex flex-col justify-between items-center text-center ">
            <h1 className="text-2xl font-bold">{name}</h1>
            <h2 className="text-lg font-semibold">{description}</h2>
            <h3 className="font-normal">{address}</h3>
          </div>
          <hr className="my-[4px] sm:my-2" />
          <div className=" pb-4 flex justify-evenly sm:justify-center gap-0 sm:gap-4 items-center">
            <button
              className=" p-[2px] sm:p-2  border-2 border-green-500 bg-green-200 rounded-lg"
              onClick={openMapHandler}
            >
              View on map
            </button>
            {auth.isLoggedIn && (
              <button className=" p-[2px] sm:p-2 border-2 border-yellow-400 bg-yellow-100 rounded-lg">
                <Link to="/places/p1">Edit</Link>
              </button>
            )}
            {auth.isLoggedIn && (
              <button
                className=" p-[2px] sm:p-2  border-2 border-red-600 bg-red-200 rounded-lg"
                onClick={openDeleteHandler}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceItem;
