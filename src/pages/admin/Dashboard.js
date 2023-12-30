import React, { useEffect, useState } from "react";
import { userStat, orderStat } from "../../apis";
import { useSelector } from "react-redux";
import { BarChart, LineChart } from "../../components";

const Dashboard = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  const [orderData, setOrderData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchOrderData = async () => {
        const response = await orderStat();
        if (response.success)
          setOrderData({
            labels: response?.data?.map((el) => el._id),
            datasets: [
              {
                label: "Revenue gained for the last two months($) ",
                data: response?.data?.map((el) => el.income),
                backgroundColor: ["green "],
              },
            ],
          });
      };
      const fetchUserData = async () => {
        const rs = await userStat();
        if (rs.success)
          setUserData({
            labels: rs.data?.map((el) => el._id),
            datasets: [
              {
                label: "Users register gained. ",
                data: rs.data?.map((el) => el.total),
                backgroundColor: ["green "],
              },
            ],
          });
      };

      fetchOrderData();
      fetchUserData();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <div className="h-[70px] w-full"></div>
      <div className="p-4 border-b bg-white w-full flex justify-between items-center fixed top-0">
        <h1 className=" text-3xl tracking-tighter ">Dashboard</h1>
      </div>

      <div className="flex items-center justify-center gap-4 ">
        <div className="w-[700px]">
          {orderData && <BarChart chartData={orderData} />}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="w-[700px]">
          {userData && <LineChart chartData={userData} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
