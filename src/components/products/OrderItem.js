import React, { useCallback, useEffect, useState } from "react";
import SelectQuantity from "../common/SelectQuantity";
import { formatMoney } from "../../ultils/helpers";

const OrderItem = ({ el, handleChangeQuantities, defaultQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(() => defaultQuantity);

  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number);
  };

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );

  useEffect(() => {
    handleChangeQuantities && handleChangeQuantities(el.product?._id, quantity);
  });
  return (
    <div>
      <div
        key={el._id}
        className="w-main border-b mx-auto py-3 grid grid-cols-10"
      >
        <span className="col-span-6 w-full text-center">
          <div className="flex gap-2">
            <img
              src={el.product?.images[0]}
              alt="images"
              className=" pl-2 w-28 h-28 object-cover"
            />

            <div className="flex flex-col gap-1">
              <span className="text-sm">{el.product?.name}</span>
            </div>
          </div>
        </span>

        <span className="col-span-1 w-full text-center">
          <div className="flex items-center h-full">
            <SelectQuantity
              originalQuantity={quantity}
              handleQuantity={handleQuantity}
              handleChangeQuantity={handleChangeQuantity}
            />
          </div>
        </span>
        <span className="col-span-3 w-full h-full flex items-center justify-center text-center">
          <span className="text-lg">
            {formatMoney(el.product?.price * quantity)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default OrderItem;
