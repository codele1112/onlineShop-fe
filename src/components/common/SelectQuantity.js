import React, { memo } from "react";

const SelectQuantity = ({
  originalQuantity,
  handleChangeQuantity,
  handleQuantity,
}) => {
  // console.log("current", current?.current?.cart);
  return (
    <div className="flex items-center">
      <span
        onClick={() => {
          handleChangeQuantity("minus");
        }}
        className="text-[24px] cursor-pointer p-2 border-r border-black"
      >
        -
      </span>
      <input
        className="py-2 px-4  w-[50px] outline-none text-black text-center mx-4"
        type="text"
        value={originalQuantity}
        onChange={(e) => {
          handleQuantity(e.target.value);
        }}
      />
      <span
        onClick={() => {
          handleChangeQuantity("plus");
        }}
        className="text-[24px] cursor-pointer p-2 border-l border-black"
      >
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);
