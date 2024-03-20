import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
  {
    id: "p1",
    name: "Empire State Building",
    description: "One of the most famous skyscrapers in the world",
    imageUrl:
      "https://flatironnomad.nyc/wp-content/uploads/2023/04/esb-header-history-scaled.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: "40.7484405",
      lng: "-73.9856644",
    },
    creator: "u1",
  },
  {
    id: "p1",
    name: "Empire State Building",
    description: "One of the most famous skyscrapers in the world",
    imageUrl:
      "https://flatironnomad.nyc/wp-content/uploads/2023/04/esb-header-history-scaled.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: "40.7484405",
      lng: "-73.9856644",
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const params = useParams().userId;
  const filteredList = DUMMY_PLACES.filter((place) => place.creator === params);

  return (
    <div>
      <PlaceList item={filteredList} />
    </div>
  );
};

export default UserPlaces;
