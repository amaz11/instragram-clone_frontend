import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apibase } from "../../axios/Api";
import { signin } from "../../redux/IsSignIn";
import Card from "../Card/Card";
import "./profile.css";

const Profile = () => {
  const [mypost, setMypost] = useState([]);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getPost = async () => {
    try {
      const { data } = await apibase.get("/post-api/get-post-of-owner");
      setMypost(data.post);

      dispatch(signin());
      // console.log(data);
    } catch (error) {
      toast.warning(error.response.data.error);
      navigate("/sign-in");
    }
  };

  const getuser = async () => {
    try {
      const { data } = await apibase.get("/get-user");
      setUser(data);
      dispatch(signin());
      // console.log(data);
    } catch (error) {
      toast.warning(error.response.data.error);
      navigate("/sign-in");
    }
  };
  useEffect(() => {
    getPost();
    getuser();
  }, []);
  return (
    <div>
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img
                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="profile"
              />
            </div>
            <div className="profile-user-settings">
              <h1 className="profile-user-name">{user.name}</h1>
              <button className="btn profile-edit-btn">Edit Profile</button>
              {/* <button
                className="btn profile-settings-btn"
                aria-label="profile settings"
              >
                <i className="fas fa-cog" aria-hidden="true" />
              </button> */}
            </div>
            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count">{mypost.length}</span>{" "}
                  posts
                </li>
                <li>
                  <span className="profile-stat-count">
                    {user && user.followers ? user.followers.length : null}
                  </span>{" "}
                  followers
                </li>
                <li>
                  <span className="profile-stat-count">
                    {user && user.followering ? user.followering.length : null}
                  </span>{" "}
                  following
                </li>
              </ul>
            </div>
            <div className="profile-bio">
              <p>
                <span className="profile-real-name">Jane Doe</span> Lorem ipsum
                dolor sit, amet consectetur adipisicing elit 📷✈️🏕️
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="gallery">
            {mypost.map((post) => {
              const { image, _id } = post;
              return (
                <>
                  {image && image.url ? <Card key={_id} image={image} /> : null}
                </>
              );
            })}
          </div>
          {/* <div className="loader" /> */}
        </div>
      </main>
    </div>
  );
};

export default Profile;
