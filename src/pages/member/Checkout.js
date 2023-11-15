import React from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "../../ultils/helpers";
import { Paypal } from "../../components";

const Checkout = () => {
  const { currentCart } = useSelector((state) => state.user);
  console.log("currentCart", currentCart);
  return (
    <div className=" w-full p-8 h-full max-h-screen flex flex-col overflow-y-auto  gap-6">
      <h2 className="text-2xl font-bold ">Checkout your order</h2>

      <div>
        <table className="table-auto w-full">
          <thead>
            <tr className="border bg-gray-200">
              <th className="text-left p-2">Product</th>
              <th className="text-center p-2">Quantity</th>
              <th className="text-right p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {currentCart?.map((el, index) => (
              <tr key={index} className="border ">
                <td className="p-2">{el.product.name}</td>
                <td className="text-center p-2">{el.quantity}</td>
                <td className="text-right p-2">
                  {formatMoney(el.product.price * el.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-2">
          <span className="flex justify-center items-center gap-8 ">
            <span>Subtotal: </span>
            <span className="font-bold text-red-800 ">
              {formatMoney(
                currentCart?.reduce(
                  (sum, el) => sum + +el.product?.price * el.quantity,
                  0
                )
              )}
            </span>
          </span>
        </div>
      </div>
      <div>input address</div>
      <div className="w-full mx-auto ">
        <Paypal amount={120} />
      </div>
    </div>
  );
};

export default Checkout;
