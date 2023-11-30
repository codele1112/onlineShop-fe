import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "../../ultils/helpers";
import { InputForm, Paypal } from "../../components";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const { currentCart, current } = useSelector((state) => state.user);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const address = watch("address");

  useEffect(() => {
    setValue("address", current?.address);
  }, [current]);

  console.log("currentCart", currentCart);
  console.log("current", current);
  console.log("address", address);

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

      <div className=" w-full">
        <InputForm
          label="Your Address"
          register={register}
          errors={errors}
          id="address"
          validate={{
            required: "Need fill this field.",
          }}
          placeholder="Please fill the address first."
        />
      </div>

      <div className="w-full mx-auto ">
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
