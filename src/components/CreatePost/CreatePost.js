import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { apibase } from "../../axios/Api";
import { signin } from "../../redux/IsSignIn";
import "./createpost.css";

const CreatePost = () => {
  const [postInput, setpostInput] = useState({
    title: "",
    postBody: "",
  });
  const [upload, setupload] = useState(false);
  const [image, setImage] = useState({});
  const dispatch = useDispatch();

  const { title, postBody } = postInput;

  const handalePost = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setpostInput({ ...postInput, [name]: value });
  };

  const handaleImageSubmit = async (e) => {
    const imageData = e.target.files[0];
    let formData = new FormData();
    formData.append("image", imageData);
    // console.log([...formData]);
    setupload(true);
    const { data } = await apibase.post("/post-api/post-photo", formData);
    // console.log(data);
    setImage({
      public_id: data.public_id,
      url: data.url,
    });
    setupload(false);
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apibase.post("/post-api/create-post", {
        title,
        postBody,
        image,
      });
      setpostInput({
        title: "",
        postBody: "",
      });
      setImage({});
      toast.success(data.message);
      dispatch(signin());
    } catch (err) {
      toast.warning(err.response.data.error);
    }
  };
  useEffect(() => {
    dispatch(signin());
  }, []);

  return (
    <div className="createpost">
      <form action="" onSubmit={postSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handalePost}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Title"
          />
        </div>
        <div className="form-group mt-4">
          <label htmlFor="exampleInputEmail1">Write Something to Share</label>
          <input
            type="text"
            name="postBody"
            value={postBody}
            onChange={handalePost}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Write Something to Share"
          />
        </div>
        <div className="form-group mt-4">
          {image && image.url ? (
            <img src={image.url} width={200} height={200} alt="postimg" />
          ) : upload ? (
            <i class="fa-solid fa-spinner"></i>
          ) : (
            <label htmlFor="exampleFormControlFile1">
              <i className="fa-solid fa-camera icon-large"></i>
              <input
                type="file"
                onChange={handaleImageSubmit}
                className="form-control-file"
                id="exampleFormControlFile1"
                hidden
              />
            </label>
          )}
        </div>
        <input type="submit" value="Post" className="btn btn-primary mt-2" />
      </form>
    </div>
  );
};

export default CreatePost;
