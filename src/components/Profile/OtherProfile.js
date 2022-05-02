import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apibase } from "../../axios/Api";
import { signin } from "../../redux/IsSignIn";
import Card from "../Card/Card";
import "./profile.css";

const OtherProfile = () => {
  const [ouser, setOuser] = useState({
    user: "",
    posts: [],
  });
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [showFollow, setShowFollow] = useState(
    user ? !user.followering.includes(id) : true
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getuser = async () => {
    try {
      const { data } = await apibase.get("/get-user");
      setUser(data);
      dispatch(signin());
      // console.log();
    } catch (error) {
      toast.warning(error.response.data.error);
      navigate("/sign-in");
    }
  };
  const getOUser = async () => {
    try {
      const { data } = await apibase.get(`/user/${id}`);
      setOuser({
        user: data.user,
        posts: data.posts,
      });
      dispatch(signin());
      // console.log(ouser.user._id);
    } catch (error) {
      toast.warning(error.response.data.error);
      navigate("/sign-in");
    }
  };
  const follow = async () => {
    try {
      const { data } = await apibase.put("/follow", {
        followId: id,
      });

      // getPosts();
      dispatch(signin());
      // console.log(data);
      getOUser();
      setShowFollow(false);
    } catch (error) {
      navigate("/sign-in");
    }
  };

  const unfollow = async () => {
    try {
      const { data } = await apibase.put("/unfollow", {
        unfollowId: id,
      });

      // getPosts();
      dispatch(signin());
      // console.log(data);
      getOUser();
      setShowFollow(true);
    } catch (error) {
      navigate("/sign-in");
    }
  };
  useEffect(() => {
    getOUser();
    getuser();
  }, []);
  return (
    <div>
      {ouser ? (
        <>
          <header>
            <div className="container">
              <div className="profile">
                <div className="profile-image">
                  <img
                    src="https://cdn.imgbin.com/22/5/16/imgbin-computer-icons-user-profile-profile-ico-man-s-profile-illustration-M4UwtQzjtzd9LFP69LEzngUuR.jpg"
                    alt="profile"
                  />
                </div>
                <div className="profile-user-settings">
                  <h1 className="profile-user-name m-4">{ouser.user.name}</h1>
                  {showFollow ? (
                    <button onClick={follow} className="btn btn-primary">
                      Follow
                    </button>
                  ) : (
                    <button onClick={unfollow} className="btn btn-danger">
                      UnFollow
                    </button>
                  )}
                </div>
                <div className="profile-stats">
                  <ul>
                    <li>
                      <span className="profile-stat-count">
                        {ouser.posts.length}
                      </span>{" "}
                      posts
                    </li>
                    <li>
                      <span className="profile-stat-count">
                        {ouser && ouser.user.followers
                          ? ouser.user.followers.length
                          : null}
                      </span>{" "}
                      followers
                    </li>
                    <li>
                      <span className="profile-stat-count">
                        {ouser && ouser.user.followering
                          ? ouser.user.followering.length
                          : null}
                      </span>{" "}
                      following
                    </li>
                  </ul>
                </div>
                <div className="profile-bio">
                  <p>
                    <span className="profile-real-name">Jane Doe</span> Lorem
                    ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️
                  </p>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="container">
              <div className="gallery">
                {ouser.posts.map((post) => {
                  const { image, _id } = post;
                  return (
                    <>
                      {image && image.url ? (
                        <Card key={_id} image={image} />
                      ) : null}
                    </>
                  );
                })}
              </div>
              {/* <div className="loader" /> */}
            </div>
          </main>
        </>
      ) : (
        <div className="loader" />
      )}
    </div>
  );
};

export default OtherProfile;
