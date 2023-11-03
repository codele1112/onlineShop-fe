import React from "react";
import { formatMoney } from "../ultils/helpers";

const ProductCard = ({ price, name, image }) => {
  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px]">
      <div className="w-full border ">
        <img
          src={image}
          alt="products"
          className="w-full h-[400px] object-cover p-4"
        />

        <div className="flex flex-col gap-2  mt-[15px] items-center w-full tetx-xs ">
          <span className="line-clamp-1  text-sm capitalize text-center">
            {name?.toLowerCase()}
          </span>
          <span>{formatMoney(price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
