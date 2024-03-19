const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyBaD6-PplWg_3gsqau2HOceRJntkPcb5hE";

async function getCoordinates(address) {
  let res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = res.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the given address",
      422
    );
    throw error;
  }
  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

module.exports = getCoordinates;
