import React, { useEffect, useState, memo } from "react";
import { formatMoney } from "../ultils/helpers";
import icons from "../ultils/icons";
import Countdown from "./Countdown";
import { getProducts } from "../apis";

const { AiOutlineMenu } = icons;
let idInterval;

const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const fetchDealDaily = async () => {
    const response = await getProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
    });
    // console.log("dealdaily", response);

    if (response.success) {
      setDealDaily(response.data.products[0]);
      const h = 24 - new Date().getHours();
      const m = 60 - new Date().getMinutes();
      const s = 60 - new Date().getSeconds();
      setHour(h);
      setMinute(m);
      setSecond(s);
    }
  };

  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchDealDaily();
  }, [expireTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) {
        setSecond((prev) => prev - 1);
      } else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);

  return (
    <div className="w-full border flex-auto">
      <div className="flex items-center justify-between p-4 w-full ">
        <span className="flex-1 "></span>
        <span className="text-main  flex-8 text-[20px] text-center ">
          DEAL DAILY
        </span>
        <span className="flex-1 "></span>
      </div>

      <div className="w-full flex flex-col items-center gap-2">
        <img
          src={dealDaily?.images[0] || ""}
          alt=""
          className="w-full object-cover"
        />

        <span className="line-clamp-1 text-center">{dealDaily?.name}</span>
        <span>{formatMoney(dealDaily?.price)}</span>
      </div>

      <div className=" px-4 mt-8">
        <div className=" flex justify-center gap-2 items-center mb-4">
          <Countdown unit={"Hours"} number={hour} />
          <Countdown unit={"Minutes"} number={minute} />
          <Countdown unit={"Seconds"} number={second} />
        </div>
        <button
          type="button"
          className=" flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-500 hover:text-black text-white font-medium py-2"
        >
          <AiOutlineMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
