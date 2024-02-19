import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "../../ultils/helpers";
import { InputField, Paypal } from "../../components";
import { getCurrentUser } from "../../apis";

const Checkout = () => {
  const { currentCart } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    address: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (isSuccess) dispatch(getCurrentUser);
    // eslint-disable-next-line
  }, [isSuccess]);

  return (
    <div className=" w-main md:max-w-[350px] lg:max-w-[700px] mx-auto my-auto ">
      <h2 className="h-[75px] flex justify-between items-center px-4 border-b text-3xl ">
        <span className=" text-blue-900  font-semibold md:text-[18px]">
          Checkout your order
        </span>
      </h2>

      <div className="mx-auto">
        <table className="table-auto w-full md:text-[15px] lg:text-[20px] ">
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

      <div className="border rounded-md">
        <span className="uppercase px-4 text-2xl text-blue-900  font-semibold md:text-[18px]">
          Basic Information
        </span>
        <div className="px-8 py-2 ">
          <span>Name</span>
          <InputField
            value={payload.name}
            setValue={setPayload}
            nameKey="name"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
        <div className="px-8 py-2 ">
          <span>Address</span>
          <InputField
            value={payload.address}
            setValue={setPayload}
            nameKey="address"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
        <div className="px-8 py-2">
          <span>Phone</span>
          <InputField
            value={payload.phone}
            setValue={setPayload}
            nameKey="phone"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
      </div>

      <div className="w-full mx-auto  mt-8">
        {payload && (
          <Paypal
            setIsSuccess={setIsSuccess}
            payload={{
              products: currentCart,
              total: currentCart?.reduce(
                (sum, el) => sum + +el.product?.price * el.quantity,
                0
              ),
              orderBy: payload.name,
              address: payload.address,
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
