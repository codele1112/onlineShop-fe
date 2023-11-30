import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb } from "../../components";
import { formatMoney } from "../../ultils/helpers";
import OrderItem from "../../components/products/OrderItem";
import { updateCart } from "../../store/user/userSlice";
import { Link } from "react-router-dom";
import path from "../../ultils/path";

const DetailCart = () => {
  const { currentCart } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChangeQuantities = (pid, quantity) => {
    dispatch(updateCart({ pid, quantity }));
  };
  // console.log("currentCart", currentCart);

  return (
    <div className="w-full">
      <div className=" h-[81px] bg-gray-100 flex items-center justify-center">
        <div className="w-main md:max-w-[390px] lg:max-w-[768px]  lg:px-3">
          <h3 className="font-semibold uppercase">My Cart</h3>
          <Breadcrumb name="your cart" />
        </div>
      </div>

      <div className="flex flex-col border mt-8 w-main md:max-w-[390px] lg:max-w-[768px] mx-auto my-8">
        <div className="w-main md:max-w-[390px] lg:max-w-[768px] mx-auto bg-second py-3 lg:px-2  grid font-semibold grid-cols-10">
          <span className="col-span-6 w-full text-center">Products</span>
          <span className="col-span-1 w-full text-center">Quantity</span>
          <span className="col-span-3 w-full text-center">Price</span>
        </div>

        {currentCart?.map((el, index) => (
          <OrderItem
            key={index}
            el={el}
            defaultQuantity={el.quantity}
            handleChangeQuantities={handleChangeQuantities}
          />
        ))}
      </div>
      <div className="w-main md:max-w-[390px] lg:max-w-[768px] mx-auto flex flex-col justify-center items-end gap-3 lg:px-3  md:px-3 ">
        <span className="flex items-center gap-8">
          <span>Subtotal: </span>
          <span>
            {formatMoney(
              currentCart?.reduce(
                (sum, el) => sum + +el.product?.price * el.quantity,
                0
              )
            )}
          </span>
        </span>
        <span className="text-xs italic text-center text-main">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <Link
          to={`/${path.CHECK_OUT}`}
          className="px-4 py-4 flex justify-center items-center rounded-md bg-main text-white text-semibold my-2"
        >
          Check out
        </Link>
      </div>
    </div>
  );
};

export default DetailCart;
