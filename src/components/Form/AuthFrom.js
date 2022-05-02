import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AuthFrom = ({
  name,
  email,
  password,
  conpassword,
  handelInput,
  signupSubmit,
  signin,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = (e) => {
    e.preventDefault();
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="">
      <section className="py-4" style={{ margin: " 100px auto" }}>
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div style={{ maxWidth: 420 }}>
              <form
                action="#"
                className="bg-white border py-4 px-5"
                onSubmit={signupSubmit}
              >
                <div className="header mb-2 text-center">
                  <img src="https://i.imgur.com/zqpwkLQ.png" alt="logo" />
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={handelInput}
                    placeholder="Mobile Number or Email"
                    required
                    type="email"
                  />
                  <label>Email</label>
                </div>

                {!signin ? (
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={handelInput}
                      placeholder="Username"
                      required
                      type="text"
                    />
                    <label>Username</label>
                  </div>
                ) : null}

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handelInput}
                    placeholder="Password"
                    required
                    type={passwordShown ? "text" : "password"}
                  />
                  <label>Password</label>
                </div>

                {!signin ? (
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      name="conpassword"
                      value={conpassword}
                      onChange={handelInput}
                      placeholder="Password"
                      required
                      type={passwordShown ? "text" : "password"}
                    />
                    <label>Confirm Password</label>
                  </div>
                ) : null}

                <input
                  className="btn btn-sm"
                  type="submit"
                  id="flexSwitchCheckDefault"
                  value={passwordShown ? "Hide" : "Show"}
                  onClick={togglePassword}
                />

                <div className="mb-2 mt-3">
                  <button
                    className="btn btn-primary fw-bold w-100 bg-gradient"
                    disabled={
                      signin
                        ? !email || !password
                        : !name || !email || !password || !conpassword
                    }
                    type="submit"
                  >
                    {!signin ? "Sign Up" : "Sign in"}
                  </button>
                </div>

                {!signin ? (
                  <div className="small text-center">
                    By signing up, you agree to our Terms , Data Policy and
                    Cookies Policy.
                  </div>
                ) : null}
              </form>

              <div className="bg-white py-4 px-5 text-center border mt-4">
                {signin ? (
                  <p className="m-0">
                    Don't have an account?
                    <NavLink to="/sign-up">Sign up</NavLink>
                  </p>
                ) : (
                  <p className="m-0">
                    Have an account? <NavLink to="/sign-in">Log In</NavLink>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthFrom;
