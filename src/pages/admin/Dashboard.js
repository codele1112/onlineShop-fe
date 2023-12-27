import React, { useState } from "react";
import { BarChart, LineChart } from "../../components";
import { dataOrderStat, dataUserStat } from "../../ultils/helpers";

const Dashboard = () => {
  // eslint-disable-next-line
  const [orderData, setOrderData] = useState({
    labels: dataOrderStat?.data?.map((el) => el._id),
    datasets: [
      {
        label: "Revenue gained for the last two months($) ",
        data: dataOrderStat?.data?.map((el) => el.income),
        backgroundColor: ["green "],
      },
    ],
  });
  // eslint-disable-next-line
  const [userData, setUserData] = useState({
    labels: dataUserStat?.data?.map((el) => el._id),
    datasets: [
      {
        label: "Users registed for the last two months (person(s)) ",
        data: dataUserStat?.data?.map((el) => el.total),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  // console.log("userdata", dataUserStat.data);

  return (
    <div>
      <div className="h-[70px] w-full"></div>
      <div className="p-4 border-b bg-white w-full flex justify-between items-center fixed top-0">
        <h1 className=" text-3xl tracking-tighter ">Dashboard</h1>
      </div>
      <div className="flex items-center justify-center gap-4 ">
        <div className="w-[700px]">
          <BarChart chartData={orderData} />
        </div>
        <div>
          {dataOrderStat?.data?.map((el, index) => (
            <div key={index} className="text-main flex flex-col mt-6">
              <span>{`Total Orders Gained in ${el._id}: ${el.totalOrders} order(s)`}</span>
              <span>{`Revenue Gained in ${el._id}: $${el.income}.00`}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="w-[700px]">
          <LineChart chartData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
