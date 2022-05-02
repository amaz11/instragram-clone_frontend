import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ErrorPage from "../Error/ErrorPage";
import Signup from "../SignUp/Signup";
import CreatePost from "../CreatePost/CreatePost";
import { ToastContainer } from "react-toastify";
import OtherProfile from "../Profile/OtherProfile";

const Main = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/Otheruser/:id" element={<OtherProfile />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default Main;
