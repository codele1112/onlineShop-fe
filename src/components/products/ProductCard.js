import React from "react";
import { formatMoney } from "../../ultils/helpers";

const ProductCard = ({ price, name, image }) => {
  return (
    <div className="w-1/3 lg:w-[300px] md:w-full flex-auto px-[10px] mb-[20px]">
      <div className="w-full  border ">
        <img
          src={image}
          alt="products"
          className="w-full h-[400px] object-cover p-4 md:p-0 md:m-auto"
        />

        <div className="flex flex-col gap-2  mt-[15px] items-center w-full tetx-xs ">
          <span className="line-clamp-1 md:text-[15px] text-sm capitalize text-center">
            {name?.toLowerCase()}
          </span>
          <span className="text-gray-600 md:text-[15px]">
            {formatMoney(price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
