import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apibase } from "../../axios/Api";
import HomeCard from "../Card/HomeCard";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/IsSignIn";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getPosts = async () => {
    try {
      const { data } = await apibase.get("/post-api/get-posts");
      setPosts(data);
      dispatch(signin());
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
      // toast.warning(error.response.data.error);
      navigate("/sign-in");
    }
  };

  const likeUnlike = async (postId, url) => {
    try {
      await apibase.put(url, {
        postId,
      });

      getPosts();
      dispatch(signin());
      // console.log(data);
    } catch (error) {
      navigate("/sign-in");
    }
  };

  const commentPost = async (e, postId) => {
    e.preventDefault();
    let commentText = e.target[0].value;
    try {
      await apibase.put("/post-api/comments", {
        commentText,
        postId,
      });

      getPosts();
      dispatch(signin());
    } catch (error) {
      navigate("/sign-in");
    }
  };

  const deletePost = async (id) => {
    try {
      const answer = window.confirm("Are You Sure");
      if (!answer) return;
      const { data } = await apibase.delete(`/post-api/post-delete/${id}`);
      toast.success(data.message);
      getPosts();
    } catch (error) {
      toast.warning(error.response.data.error);
    }
  };

  useEffect(() => {
    getPosts();
    getuser();
  }, []);
  return (
    <div className="container">
      <div className="container-box"></div>

      <div className="home-gallery">
        {posts.map((post) => {
          const { comment, title, image, likes, postBody, postBy, _id } = post;
          return (
            <HomeCard
              key={_id}
              _id={_id}
              comment={comment}
              title={title}
              image={image}
              likes={likes}
              postBody={postBody}
              postBy={postBy}
              user={user}
              likeUnlike={likeUnlike}
              commentPost={commentPost}
              deletePost={deletePost}
            />
          );
        })}
      </div>

      {/* <div className="loader" /> */}
    </div>
  );
};

export default Home;
