import React from "react";
import { useSelector } from "react-redux";
import { Product } from "../../components";

const Wishlist = () => {
  const { current } = useSelector((state) => state.user);
  return (
    <div>
      <div className="h-[70px] w-full"></div>
      <div className="p-4 border-b bg-white w-full flex justify-between items-center fixed top-0">
        <h1 className=" text-3xl tracking-tighter ">My Wishlist</h1>
      </div>

      <div className="p-4">
        <div className="p-4 w-full grid grid-cols-4 gap-2">
          {current?.wishlist?.map((el, index) => (
            <div key={index}>
              <Product pid={el.id} productData={el} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
