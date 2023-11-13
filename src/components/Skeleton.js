import React from "react";

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        background: "#2833302e", 
      }}
    ></div>
  );
};

export default Skeleton;