import React, { useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";

const PlaceItem = ({
  name,
  description,
  image,
  creatorId,
  address,
  coordinates,
}) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        footer={<button onClick={closeMapHandler}>CLOSE</button>}
      >
        <div className="h-[20rem] w-full">
          <h2>THE MAP</h2>
        </div>
      </Modal>
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
            <button className=" p-[2px] sm:p-2  border-2 border-green-500 bg-green-200 rounded-lg">
              View on map
            </button>
            <button className=" p-[2px] sm:p-2 border-2 border-yellow-400 bg-yellow-100 rounded-lg">
              Edit
            </button>
            <button className=" p-[2px] sm:p-2  border-2 border-red-600 bg-red-200 rounded-lg">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceItem;
