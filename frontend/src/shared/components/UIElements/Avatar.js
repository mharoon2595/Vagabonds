import React from "react";

const Avatar = (props) => {
  return (
    <div>
      <img
        className="w-[95px] h-[95px] border border-cyan-300 border-[5px] object-fill rounded-full"
        src={props.image}
        alt={props.alt}
      />
    </div>
  );
};

export default Avatar;
