import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "../../ultils/helpers";
import { Paypal } from "../../components";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import path from "../../ultils/path";

const Checkout = () => {
  const { currentCart, current } = useSelector((state) => state.user);
  const { watch, setValue } = useForm();
  const address = watch("address");
  // const navigate = useNavigate();

  useEffect(() => {
    setValue("address", current?.address);
  }, [current]);

  // const handleOnClick = () => {
  //   navigate(`/${path.HOME}`);
  // };

  console.log("currentCart", currentCart);
  console.log("current", current);
  console.log("address", address);

  return (
    <div className=" w-main md:max-w-[350px] lg:max-w-[700px] mx-auto my-auto ">
      <h2 className="h-[75px] flex justify-between items-center px-4 border-b text-3xl ">
        <span className=" text-blue-900  font-semibold md:text-[18px]">
          Checkout your order
        </span>
      </h2>

      <div className="mx-auto">
        <table className="table-auto w-full md:text-[15px] lg:text-[20px]">
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
      <div className=" w-full">
        <span>Address:</span>
        <span className="font-bold text-red-800 ">{current?.address}</span>
      </div>

      <div className="w-full mx-auto  mt-8">
        {address && address?.length > 10 && (
          <Paypal
            payload={{
              products: currentCart,
              total: currentCart?.reduce(
                (sum, el) => sum + +el.product?.price * el.quantity,
                0
              ),
              address,
            }}
            amount={currentCart?.reduce(
              (sum, el) => sum + +el.product?.price * el.quantity,
              0
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
