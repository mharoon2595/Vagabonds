import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DUMMY_PLACES } from "./UserPlaces";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validator";
import { useForm } from "../../shared/hooks/form-hooks";
import "./NewPlaces.css";
import { AuthContext } from "../../shared/context/auth-context";

const UpdatePlaces = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === params);
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
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
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.name,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
      setIsLoading(false);
    }
  }, [setFormData, identifiedPlace]);

  if (!auth.isLoggedIn) {
    // return (
    //   <div className="text center p-2 m-2 text-lg">
    //     Please login to access this page.
    //   </div>
    // );
    navigate("/");
  }

  if (!identifiedPlace) {
    return (
      <div className="p-2 m-2 text-center">
        <h1>No places found. Please add a place and try again.</h1>
      </div>
    );
  }

  const submitUpdation = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  if (isLoading) {
    return (
      <div className="p-2 m-2 text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={submitUpdation}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description with minimum 5 characters."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.description.isValid}
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
    </form>
  );
};

export default UpdatePlaces;
