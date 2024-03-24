import React from "react";

const Avatar = (props) => {
  return (
    <div>
      <img
        className="w-[85px] h-[85px] lg:w-[95px] lg:h-[95px] lg:w-[95px] lg:h-[95px] object-fill rounded-full"
        src={props.image}
        alt={props.alt}
      />
    </div>
  );
};

export default Avatar;
