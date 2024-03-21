import React from "react";

const Avatar = (props) => {
  return (
    <div>
      <img
        className="w-[95px] h-[95px]  object-fill rounded-full"
        src={props.image}
        alt={props.alt}
      />
    </div>
  );
};

export default Avatar;
