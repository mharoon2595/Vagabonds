import React, { useContext, useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import swal from "sweetalert";

const PlaceItem = ({
  name,
  description,
  image,
  id,
  address,
  coordinates,
  isLoading,
  userId,
  deletionHandler,
}) => {
  const [showMap, setShowMap] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const openDeleteHandler = () => {
    setConfirmDelete(true);
  };

  const closeDeleteHandler = () => {
    setConfirmDelete(false);
  };

  const auth = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className=" m-3 p-3 animate-pulse w-[50%] h-[400px] bg-slate-400 rounded-lg"></div>
    );
  }

  console.log("place id--->", id);

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/places/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + auth.token },
        }
      );
      swal("Done", "Deletion successful", "success");
      closeDeleteHandler();
      deletionHandler(id);
    } catch (err) {
      swal("Error", "Please try again", "error");
    }
  };

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
              onClick={deleteHandler}
            >
              Yes
            </button>
          </>
        }
      ></Modal>
      <div className=" m-2 p-2  flex justify-center min-w-[300px]">
        <div className=" flex flex-col w-[60%] sm:w-[50%] h-[400px] sm:h-[550px] justify-between bg-white rounded-lg shadow-xl">
          <img
            src={`${process.env.REACT_APP_ASSET_URL}${image}`}
            className="w-full h-[60%] rounded-t-lg"
          />
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
            {auth.isLoggedIn && auth.userId === userId && (
              <Link to={`/places/${id}`}>
                <button className=" p-[2px] sm:p-2 border-2 border-yellow-400 bg-yellow-100 rounded-lg">
                  Edit
                </button>
              </Link>
            )}
            {auth.isLoggedIn && auth.userId === userId && (
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
