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
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

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
      image: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const formSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", auth.userId);
      formData.append("image", formState.inputs.image.value);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/places",
        {
          method: "POST",
          body: formData,
          headers: { Authorization: "Bearer " + auth.token },
        }
      );
      const addPlace = await response.json();
      if (!response.ok) {
        throw new Error(addPlace.message);
      }

      setIsLoading(false);
      navigate("/");
      await swal(`Alright!`, "Place has been added!", "success");
    } catch (err) {
      setIsLoading(false);
      await swal("Error", `${err.message}`, "error");
    }
  };

  if (!auth.isLoggedIn) {
    navigate("/");
  }

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="place-form" onSubmit={formSubmit}>
        <div className="flex justify-center text-lg text-green-500">
          Add a place
        </div>
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
          validators={[VALIDATOR_MINLENGTH(10)]}
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
        <ImageUpload center onInput={inputHandler} id="image" />
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
