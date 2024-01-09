import React, { useEffect, useState } from "react";
import moment from "moment";
import { getUserOrders } from "../../apis";
import { formatMoney } from "../../ultils/helpers";
import { CustomSelect, InputForm, Pagination } from "../../components";
import { useForm } from "react-hook-form";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { statusOrders } from "../../ultils/contants";

const History = () => {
  const [orderList, setOrdersList] = useState([]);
  const [count, setCount] = useState(0);
  const [params] = useSearchParams();
  console.log("params", params.get("page"));
  const {
    register,
    // handleSubmit,
    // reset,
    watch,
    // setValue,
    formState: { errors },
  } = useForm();
  watch("q");
  const status = watch("status");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchOrdersList = async (params) => {
    const response = await getUserOrders({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    // console.log("orders response", response);

    if (response.success) {
      setOrdersList(response.data.orders);
      setCount(response.data.count);
    }
  };
  useEffect(() => {
    const param = Object.fromEntries([...params]);
    fetchOrdersList(param);
  }, [params]);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };

  // console.log("orderList", orderList);
  return (
    <div>
      <div className="h-[70px] w-full"></div>
      <div className="p-4 border-b bg-white w-full flex justify-between items-center fixed top-0">
        <h1 className=" text-3xl tracking-tighter ">History</h1>
      </div>

      <div className="p-4">
        <div className="flex justify-end items-center px-4">
          <form
            className="w-[45%] grid grid-cols-2 gap-4"
            // onSubmit={handleSubmit(handleSearchProducts())}
          >
            <div className="col-span-1 ">
              <InputForm
                id="q"
                register={register}
                errors={errors}
                fullWidth
                placeholder="Search orders by status..."
              />
            </div>
            <div className="col-span-1 flex items-center">
              <CustomSelect
                option={statusOrders}
                value={status}
                onChange={(value) => handleSearchStatus(value)}
                wrapClassName="w-full"
              />
            </div>
          </form>
        </div>

        <table className="table-auto text-left mb-6 w-full  ">
          <thead className="text-red-900 text-[13px] border-b bg-second">
            <tr className="border ">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Products</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>

          <tbody>
            {orderList?.length &&
              orderList?.map((el, index) => (
                <tr className="border-b" key={index}>
                  <td className="px-4 py-2 text-xs">{index + 1} </td>
                  <td className="px-4 py-2">
                    {el?.products?.map((i, index) => (
                      <ul key={index}>
                        <li className="text-xs">
                          {`product: ${i.name},
                      quantity: ${i.quantity}`}
                        </li>
                      </ul>
                    ))}
                  </td>
                  <td className="px-4 py-2 text-xs">{el.status}</td>
                  <td className="px-4 py-2 text-xs">{formatMoney(el.total)}</td>
                  <td className="px-4 py-2 text-xs">
                    {moment(el.updatedAt).format("DD/MM/YYYY")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="w-full flex justify-end my-8">
          <Pagination totalCount={count} />
        </div>
      </div>
    </div>
  );
};

export default History;
