import React, { useContext, useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { AuthContext } from "../../shared/context/auth-context";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";

const UserPlaces = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = useParams().userId;
  const auth = useContext(AuthContext);
  const [loadedPlaces, setLoadedPlaces] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        const placesRetrieved = await response.json();
        console.log("JOJO PLACES--->", placesRetrieved);
        if (!response.ok) {
          throw new Error("Places could not be fetched");
        }
        setIsLoading(false);
        setLoadedPlaces(placesRetrieved);
      } catch (err) {
        setIsLoading(false);
        navigate("/");
        await swal("An error occured", err.message, "error");
      }
    }
    fetchPlaces();
  }, [userId]);

  const refreshListAfterDeletion = (pid) => {
    setLoadedPlaces((prevPlaces) => {
      console.log("prevPlaces--->", prevPlaces);
      const updatedPlaces = prevPlaces.places.filter(
        (place) => place.id !== pid
      );
      return { places: updatedPlaces };
    });
  };

  return (
    <div>
      <PlaceList
        userId={userId}
        isLoading={isLoading}
        item={loadedPlaces}
        deletionHandler={refreshListAfterDeletion}
      />
    </div>
  );
};

export default UserPlaces;
