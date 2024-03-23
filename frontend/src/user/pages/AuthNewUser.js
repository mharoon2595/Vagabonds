import React, { useContext, useState } from "react";
import "../../places/pages/NewPlaces.css";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hooks";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validator";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import swal from "sweetalert";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const AuthNewUser = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
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

  const submitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    console.log("entered creds--->", formState);
    try {
      const signup = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: formState.inputs.username.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
      });
      const signupResponse = await signup.json();
      if (!signup.ok) {
        console.log(signupResponse);
        throw new Error(signupResponse.message);
      }
      console.log("signUp details--->", signupResponse);
      setIsLoading(false);
      navigate("/auth");
      await swal(
        `Alright ${formState.inputs.username.value}!!`,
        "Account created! Please login now",
        "success"
      );
    } catch (err) {
      console.log("error-->", err);
      setIsLoading(false);
      await swal("Error", `${err.message}`, "error");
    }
  };

  return (
    <div>
      <form className="place-form" onSubmit={submitHandler}>
        <div className="text-center text-green-500 text-xl">
          Create new user
        </div>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="username"
          element="input"
          type="text"
          placeholder="Username"
          label="Username"
          errorText="Please type in your username."
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
        />
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
        <ImageUpload center />
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
        <div className="flex justify-center gap-2">
          <button
            className={` p-[2px] sm:p-2  border-2 border-green-500 bg-green-200 rounded-lg ${
              formState.isValid ? "" : "opacity-30"
            }`}
            type="submit"
            disabled={!formState.isValid}
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthNewUser;
