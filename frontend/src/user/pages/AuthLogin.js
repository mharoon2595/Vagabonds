import React, { useContext, useState } from "react";
import "../../places/pages/NewPlaces.css";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hooks";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../utils/validator";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import swal from "sweetalert";

const AuthLogin = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  console.log("auth context from outlet--->", auth);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/users/login",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        }
      );
      const loginResponse = await response.json();
      if (!response.ok) {
        throw new Error("Check your credentials and try again");
      }
      setIsLoading(false);

      auth.login(loginResponse.userId, loginResponse.name, loginResponse.token);

      navigate("/");
      await swal("Logged In", "Awesome!!", "success");
    } catch (err) {
      setIsLoading(false);
      await swal("Oops!", `${err.message}`, "error");
    }
  };

  return (
    <>
      <form className="place-form" onSubmit={submitHandler}>
        <div className="text-center text-green-500 text-xl">Login</div>
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
