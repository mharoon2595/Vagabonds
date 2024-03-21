import React, { useContext } from "react";
import "../../places/pages/NewPlaces.css";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hooks";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../utils/validator";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

const AuthLogin = () => {
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("entered creds--->", formState);
    auth.login();
  };

  return (
    <>
      <form className="place-form" onSubmit={submitHandler}>
        <Input
          id="email"
          element="input"
          type="text"
          placeholder="Email"
          label="Email"
          errorText="Please type in a valid email address"
          onInput={inputHandler}
          validators={[VALIDATOR_EMAIL()]}
        />
        <Input
          id="password"
          element="input"
          type="password"
          placeholder="Password"
          label="Password"
          errorText="Please type in a password with atleast 6 characters"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(6)]}
        />
        <div className="flex flex-row-reverse gap-2">
          <button
            className={` p-[2px] sm:p-2  border-2 border-green-500 bg-green-200 rounded-lg `}
            type="submit"
          >
            <Link to="new">Create user</Link>
          </button>
          <button
            className={` p-[2px] sm:p-2  border-2 border-green-500 bg-green-200 rounded-lg ${
              formState.isValid ? "" : "opacity-30"
            }`}
            type="submit"
            disabled={!formState.isValid}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthLogin;
