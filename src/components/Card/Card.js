import React from "react";

const Card = ({ image }) => {
  return (
    <div>
      <div className="gallery-item" tabIndex={0}>
        {image && image.url ? (
          <>
            <img className="card-img-top" src={image.url} alt="test" />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
