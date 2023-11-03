import React, { useState } from "react";
import { formatMoney } from "../ultils/helpers";
import { Link } from "react-router-dom";
import path from "../ultils/path";

function Product({ productData }) {
  // console.log("productData", productData);
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className="w-full text-base pr-5 px-[10px]">
      <Link
        className="w-full border p-[15px] flex flex-col items-center "
        to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${
          productData?.name
        }`}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative ">
          <img
            src={productData?.images[0] || ""}
            alt=""
            className="w-full object-cover h-[300px]"
          />
          <div className="flex flex-col gap-1  mt-[15px] items-start w-full ">
            <span className="line-clamp-1">{productData?.name}</span>
            <span>{formatMoney(productData?.price)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Product;
