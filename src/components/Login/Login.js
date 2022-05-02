import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apibase } from "../../axios/Api";
import { signin } from "../../redux/IsSignIn";
import AuthFrom from "../Form/AuthFrom";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const isSingin = useSelector((state) => state.auth.isSingin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = input;

  const handelInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const signupSubmit = async (e) => {
    e.preventDefault();
    const validEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmail.test(email)) {
      return toast.warning("Enter Valid Email");
    }
    try {
      const { data } = await apibase.post("/sign-in", {
        email,
        password,
      });
      dispatch(signin());
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.warning(error.response.data.error);
    }
  };

  const singincheck = () => {
    if (isSingin) {
      navigate("/");
    }
  };
  return (
    <div>
      {isSingin ? (
        <>
          <button type="button" onClick={singincheck()}></button>
        </>
      ) : (
        <>
          <AuthFrom
            email={email}
            password={password}
            handelInput={handelInput}
            signupSubmit={signupSubmit}
            signin={true}
          />
        </>
      )}
    </div>
  );
};

export default Login;
