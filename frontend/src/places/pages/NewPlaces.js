import React, { useCallback, useReducer } from "react";
import "./NewPlaces.css";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../utils/validator";
import { useForm } from "../../shared/hooks/form-hooks";

const NewPlaces = () => {
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

  const formSubmit = (event) => {
    event.preventDefault();
  };

  return (
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
  );
};

export default NewPlaces;
