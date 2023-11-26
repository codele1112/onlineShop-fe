import React, { memo } from "react";

const Button = ({ children, handleOnClick, style, type = "button", fw }) => {
  return (
    <button
      type={type}
      className={
        style
          ? style
          : `px-4 py-4 flex justify-center items-center rounded-md bg-main text-white text-semibold my-2 ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      <span>{children}</span>
    </button>
  );
};

export default memo(Button);

// className =
//   " flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-500 hover:text-black text-white font-medium py-2";
