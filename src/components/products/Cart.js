import React, { memo } from "react";
import icons from "../../ultils/icons";
import { showCart } from "../../store/categories/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "../../ultils/helpers";
import Button from "../buttons/Button";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../store/user/asyncActions";
import { removeProductInCart } from "../../apis";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";

const { AiOutlineCloseSquare, IoIosRemoveCircleOutline } = icons;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current } = useSelector((state) => state.user);
  // console.log("current.cart", current.cart);
  const removeCart = async (pid) => {
    const response = await removeProductInCart(pid);
    if (response.success) {
      dispatch(getCurrentUser());
    } else toast.error(response.mes);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[400px] h-screen bg-second p-6 grid grid-rows-10"
    >
      <header className=" flex justify-between items-center border-b border-gray-800 row-span-1 h-full font-bold text-2xl ">
        <span>Your Cart</span>

        <span
          onClick={() => dispatch(showCart())}
          className="p-2 cursor-pointer"
        >
          <AiOutlineCloseSquare />
        </span>
      </header>

      <section className="mt-4 row-span-7 flex flex-col gap-3 h-full max-h-full overflow-y-auto">
        {!current?.cart && (
          <span className="text-xs italic"> Your cart is empty.</span>
        )}
        {current?.cart &&
          current?.cart.map((el, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-2">
                <img
                  src={el.product?.images[0]}
                  alt="images"
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col gap-2 justify-start">
                  <span className="text-sm">{el.product?.name}</span>
                  <span className="text-sm">
                    {formatMoney(el.product?.price)}
                  </span>
                </div>
              </div>

              <span
                onClick={() => removeCart(el.product?._id)}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:text-red-800  hover:bg-gray-400 cursor-pointer "
              >
                <IoIosRemoveCircleOutline size={16} />
              </span>
            </div>
          ))}
      </section>

      <div className="row-span-2 h-full flex flex-col justify-between ">
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <span>Subtotal: </span>
          <span>
            {formatMoney(
              current?.cart?.reduce(
                (sum, el) => sum + Number(el.product?.price),
                0
              )
            )}
          </span>
        </div>
        <span className="text-xs italic text-center text-main">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <Button
          fw
          handleOnClick={() => {
            dispatch(showCart());
            navigate(`/${path.DETAIL_CART}`);
          }}
          children={"Shopping Cart"}
        />
      </div>
    </div>
  );
};

export default memo(Cart);
