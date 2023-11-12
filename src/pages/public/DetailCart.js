import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Breadcrumb, Button, SelectQuantity } from "../../components";
import { formatMoney } from "../../ultils/helpers";

const DetailCart = () => {
  const current = useSelector((state) => state.user?.cart);
  console.log("current", current);
  const [currentCart, setCurrentCart] = useState(current);

  const onQuantityChanged = (number, tag) => {
    const cart = currentCart.map((item) => {
      console.log(item);

      if (item.product._id === tag) {
        return { _id: item._id, quantity: number, product: item.product };
      }
      return item;
    });
    console.log("cart", cart);
    setCurrentCart(cart);
  };
  console.log("CurrentCart", currentCart);

  return (
    <div className="w-full">
      <div className=" h-[81px] bg-gray-100 flex items-center justify-center">
        <div className="w-main">
          <h3 className="font-semibold uppercase">My Cart</h3>
          <Breadcrumb name="your cart" />
        </div>
      </div>

      <div className="flex flex-col border mt-8 w-main mx-auto my-8">
        <div className="w-main mx-auto bg-second py-3 grid font-semibold grid-cols-10">
          <span className="col-span-6 w-full text-center">Products</span>
          <span className="col-span-1 w-full text-center">Quantity</span>
          <span className="col-span-3 w-full text-center">Price</span>
        </div>

        {currentCart?.map((el, index) => (
          <div
            key={index}
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
                  originalQuantity={el.quantity}
                  tag={el.product._id.toString()}
                  onQuantityChanged={onQuantityChanged}
                />
              </div>
            </span>
            <span className="col-span-3 w-full h-full flex items-center justify-center text-center">
              <span className="text-lg">{formatMoney(el.product?.price)}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="w-main mx-auto flex flex-col justify-center items-end gap-3 ">
        <span className="flex items-center gap-8">
          <span>Subtotal: </span>
          <span>
            {formatMoney(
              currentCart?.reduce((sum, el) => sum + +el.product?.price, 0)
            )}
          </span>
        </span>
        <span className="text-xs italic text-center text-main">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <Button name="Check out" />
      </div>
    </div>
  );
};

export default DetailCart;
