import React, { useContext, useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { AuthContext } from "../../shared/context/auth-context";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";

export const DUMMY_PLACES = [];

const UserPlaces = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = useParams().userId;
  const auth = useContext(AuthContext);
  const [places, setPlaces] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/places/user/${userId}`
        );
        const placesRetrieved = await response.json();
        console.log("JOJO PLACES--->", placesRetrieved);
        if (!response.ok) {
          throw new Error("Places could not be fetched");
        }
        setIsLoading(false);
        setPlaces(placesRetrieved);
      } catch (err) {
        setIsLoading(false);
        navigate("/");
        await swal("An error occured", err.message, "error");
      }
    }
    fetchPlaces();
  }, []);

  const refreshListAfterDeletion = (pid) => {
    setPlaces((prevPlaces) => {
      console.log("prevPLACES---->", prevPlaces);
      prevPlaces.places.filter((place) => place.id !== pid);
    });
  };

  // console.log("places--->", places);
  // console.log("user id--->", auth.userId);

  return (
    <div>
      <PlaceList
        userId={userId}
        isLoading={isLoading}
        item={places}
        deletionHandler={(pid) => {
          refreshListAfterDeletion(pid);
        }}
      />
    </div>
  );
};

export default UserPlaces;
