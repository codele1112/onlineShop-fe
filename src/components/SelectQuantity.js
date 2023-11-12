import React, { memo, useState } from "react";

const SelectQuantity = ({ originalQuantity, onQuantityChanged, tag }) => {
  const [quantity, setQuantity] = useState(originalQuantity);

  return (
    <div className="flex items-center">
      <span
        onClick={() => {
          setQuantity(originalQuantity - 1);
          onQuantityChanged(originalQuantity - 1, tag);
        }}
        className="text-[24px] cursor-pointer p-2 border-r border-black"
      >
        -
      </span>
      <input
        className="py-2 px-4  w-[50px] outline-none text-black text-center"
        type="text"
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
          onQuantityChanged(e.target.value, tag);
        }}
      />
      <span
        onClick={() => {
          setQuantity(originalQuantity + 1);
          onQuantityChanged(originalQuantity + 1, tag);
        }}
        className="text-[24px] cursor-pointer p-2 border-r border-black"
      >
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);
