import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apibase } from "../../axios/Api";
import { signin, signout } from "../../redux/IsSignIn";

const Navbar = () => {
  const isSingin = useSelector((state) => state.auth.isSingin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelsignout = () => {
    apibase.get("/sign-out");
    dispatch(signout());
    navigate("/sign-in");
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid ">
        <NavLink className="navbar-brand" to="/">
          Instagram-Clone
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Offcanvas
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {isSingin === true ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <p
                      className="nav-link dropdown-toggle"
                      id="offcanvasNavbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span>Uesr</span>
                    </p>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="offcanvasNavbarDropdown"
                    >
                      <li>
                        <NavLink className="dropdown-item" to="/post">
                          Post
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/user">
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={handelsignout}
                          className="dropdown-item"
                        >
                          Log-out
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/sign-in">
                      Sign in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/sign-up">
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
