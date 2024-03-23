import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DUMMY_PLACES } from "./UserPlaces";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validator";
import { useForm } from "../../shared/hooks/form-hooks";
import "./NewPlaces.css";
import { AuthContext } from "../../shared/context/auth-context";
import swal from "sweetalert";

const UpdatePlaces = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState("");
  const params = useParams().placeId;
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/places/${params}`
        );
        const responseData = await response.json();
        setPlaces(responseData.place);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        swal("Error", err.message, "error");
      }
    };
    fetchPlaces();
  }, []);

  console.log("PARAMS---->", params);

  console.log("PLACES---->", places);

  if (!auth.isLoggedIn) {
    navigate("/");
  }

  const submitUpdation = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/places/${params}`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
          }),
        }
      );
      const places = await response.json();
      if (!response.ok) {
        throw new Error("Places could not be fetched");
      }
      setIsLoading(false);
      navigate(`/${auth.userId}/places`);
      await swal(`Alright!`, "Place details updated!", "success");
    } catch (err) {
      setIsLoading(false);
      await swal("An error occured", err.message, "error");
    }
  };

  return (
    <form className="place-form" onSubmit={submitUpdation}>
      {places && (
        <>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={places.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            type="text"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description with minimum 5 characters."
            onInput={inputHandler}
            initialValue={places.description}
            initialValid={true}
          />
          <button
            className={`p-[2px] sm:p-2  border-2 border-green-500 bg-green-200 rounded-lg ${
              formState.isValid ? "" : "opacity-30"
            }`}
            type="submit"
            disabled={!formState.isValid}
          >
            UPDATE PLACE
          </button>
        </>
      )}
    </form>
  );
};

export default UpdatePlaces;
