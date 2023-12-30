import React, { useEffect, useState } from "react";
import moment from "moment";
import { getOrders } from "../../apis";
import { formatMoney } from "../../ultils/helpers";
import { Pagination } from "../../components";

const ManageOrder = () => {
  const [orderList, setOrdersList] = useState([]);
  const [count, setCount] = useState(null);
  const fetchOrdersList = async () => {
    const response = await getOrders();

    if (response.success) {
      setOrdersList(response.data);
      setCount(response.count);
    }
  };
  useEffect(() => {
    fetchOrdersList();
  }, []);

  return (
    <div className="w-full  ">
      <h1 className=" h-[75px] flex justify-between items-center px-4 border-b text-3xl ">
        Orders
      </h1>

      <table className="table-auto text-left mb-6 w-full ">
        <thead className="text-red-900 text-[13px] border-b bg-second">
          <tr className="border ">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Products</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 ">Order By</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Created At</th>
          </tr>
        </thead>

        <tbody>
          {orderList?.length &&
            orderList?.map((el, index) => (
              <tr className="border-b" key={index}>
                <td className="px-4 py-2 text-xs">{index + 1}</td>
                <td className="px-4 py-2">
                  {el?.products &&
                    el?.products?.map((i, index) => (
                      <ul key={index}>
                        <li className="text-xs">
                          {`product: ${i.name},
                      quantity: ${i.quantity}`}
                        </li>
                      </ul>
                    ))}
                </td>
                <td className="px-4 py-2 text-xs">{el.status}</td>
                <td className="px-4 py-2 text-xs">{el.orderBy}</td>
                <td className="px-4 py-2 text-xs">
                  {el.total ? formatMoney(el.total) : ""}
                </td>
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
  );
};

export default ManageOrder;
