import React from "react";

const Skeleton = ({ width, height, borderRadius, marginBottom , marginRight}) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        background: "#2833302e", 
        marginBottom: "20px",
        marginRight: "16px"
      }}
    ></div>
  );
};

export default Skeleton;