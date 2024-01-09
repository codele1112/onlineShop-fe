import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import { formatMoney } from "../../ultils/helpers";
import OrderItem from "../../components/products/OrderItem";
import { updateCart } from "../../store/user/userSlice";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import Swal from "sweetalert2";

const DetailCart = () => {
  const { currentCart, current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeQuantities = (pid, quantity) => {
    dispatch(updateCart({ pid, quantity }));
  };

  const handleSubmit = () => {
    if (!current?.address) {
      return Swal.fire({
        icon: "info",
        title: "Almost!",
        text: "Please update your address before checkout.",
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: "Not now...",
        confirmButtonText: "Go to update",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.MEMBER}/${path.PERSONAL}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
    } else {
      navigate(`/${path.CHECK_OUT}`);
    }
  };

  return (
    <div>
      <div className="h-[70px] w-full"></div>
      <div className="p-4 border-b bg-white w-full flex justify-between items-center fixed top-0">
        <h1 className=" text-3xl tracking-tighter ">My Cart</h1>
      </div>

      <div className="p-4">
        <div className="flex flex-col border mt-8 w-full mx-auto my-8">
          <div className=" mx-auto bg-second w-full py-3 lg:px-2  grid font-semibold grid-cols-10">
            <span className="col-span-6  text-center">Products</span>
            <span className="col-span-1 text-center">Quantity</span>
            <span className="col-span-3 text-center">Price</span>
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
        <div className="mx-auto flex flex-col justify-center items-end gap-3 lg:px-3  md:px-3 ">
          <span className="flex items-center gap-4">
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

          <Button handleOnClick={handleSubmit}>Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailCart;
