import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apibase } from "../../axios/Api";
import AuthFrom from "../Form/AuthFrom";

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    conpassword: "",
  });
  const navigate = useNavigate();
  const { name, email, password, conpassword } = input;

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
      const { data } = await apibase.post("/sign-up", {
        name,
        email,
        password,
        conpassword,
      });
      // console.log(data);
      toast.success(data.massage);
      setInput({
        name: "",
        email: "",
        password: "",
        conpassword: "",
      });
      navigate("/sign-in");
    } catch (error) {
      toast.warning(error.response.data.error);
    }
  };
  return (
    <div className="box-margin">
      <AuthFrom
        name={name}
        email={email}
        password={password}
        conpassword={conpassword}
        handelInput={handelInput}
        signupSubmit={signupSubmit}
      />
    </div>
  );
};

export default Signup;
