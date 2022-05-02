import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({
  _id,
  title,
  image,
  likes,
  comment,
  postBody,
  postBy,
  likeUnlike,
  commentPost,
  deletePost,
  user,
}) => {
  return (
    <div>
      <div className="card mb-4">
        <h6 className="card-title p-3">
          <Link
            to={postBy._id !== user._id ? `/Otheruser/${postBy._id}` : "/user"}
            style={{ textDecoration: "none" }}
          >
            <span>{postBy.name}</span>
          </Link>
          {postBy._id === user._id ? (
            <i
              className="fa-solid fa-trash"
              onClick={() => deletePost(_id)}
              style={{ color: "red", cursor: "pointer", float: "right" }}
            ></i>
          ) : null}
        </h6>
        {image && image.url ? (
          <img className="card-img-top" src={image.url} alt="test" />
        ) : null}

        <div className="card-body">
          {/* <i
            className="fas fa-heart"
            aria-hidden="true"
            style={{ color: "red", fontSize: "30px" }}
          /> */}
          {likes.includes(user._id) ? (
            <i
              className="fa-solid fa-heart"
              onClick={() => {
                likeUnlike(_id, "/post-api/unlike");
              }}
              style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
            ></i>
          ) : (
            <i
              className="fa-solid fa-heart"
              onClick={() => {
                likeUnlike(_id, "/post-api/like");
              }}
              style={{ color: "blue", fontSize: "30px", cursor: "pointer" }}
            ></i>
          )}

          <h6>{likes.length}likes</h6>
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{postBody}</p>
          {comment.length > 0 ? <h5>Comments</h5> : ""}

          {comment.map((com) => {
            return (
              <div key={com._id}>
                <h6 className="font-weight-bold">{com.commentBy.name}</h6>
                <p className="card-text">
                  <span>{com.commentText}</span>
                </p>
              </div>
            );
          })}

          <form action="" onSubmit={(e) => commentPost(e, _id)}>
            <div className="input-group input-group-sm mb-3 mt-2">
              <input
                type="text"
                className="form-control"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Comment"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
