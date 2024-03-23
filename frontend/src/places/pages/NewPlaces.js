import React, { useCallback, useContext, useReducer, useState } from "react";
import "./NewPlaces.css";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../utils/validator";
import { useForm } from "../../shared/hooks/form-hooks";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useOutletContext } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

const NewPlaces = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
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
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  console.log("logged in user-->", auth.userId);
  const formSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/places", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
      });
      const addPlace = await response.json();
      if (!response.ok) {
        throw new Error(addPlace.message);
      }
      console.log("added place--->", addPlace);
      setIsLoading(false);
      navigate("/");
      await swal(`Alright!`, "Place has been added!", "success");
    } catch (err) {
      setIsLoading(false);
      await swal("Error", `${err.message}`, "error");
    }
  };

  if (!auth.isLoggedIn) {
    // return (
    //   <div className="text center p-2 m-2 text-lg">
    //     Please login to access this page.
    //   </div>
    // );
    navigate("/");
  }

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="place-form" onSubmit={formSubmit}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          errorText="Please type in something"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          errorText="Please enter a valid desription with atleast 5 characters"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          errorText="Please enter a valid address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <button
          className={`p-[2px] sm:p-2  border-2 border-green-500 bg-green-200 rounded-lg ${
            formState.isValid ? "" : "opacity-30"
          }`}
          type="submit"
          disabled={!formState.isValid}
        >
          ADD PLACE
        </button>
      </form>
    </>
  );
};

export default NewPlaces;
