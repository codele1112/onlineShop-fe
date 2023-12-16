import React, { useEffect, useState } from "react";
import moment from "moment";
import { getUserOrders } from "../../apis";
import { formatMoney } from "../../ultils/helpers";

const History = () => {
  const [orderList, setOrdersList] = useState([]);

  const fetchOrdersList = async () => {
    const response = await getUserOrders();
    console.log("orders response", response);

    if (response.success) {
      setOrdersList(response.data);
    }
  };
  useEffect(() => {
    fetchOrdersList();
  }, []);

  console.log("orderList", orderList);
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
    </div>
  );
};

export default History;
