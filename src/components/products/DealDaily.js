import React, { useEffect, useState, memo } from "react";
import { formatMoney, secondsToHms } from "../../ultils/helpers";
import Countdown from "../common/Countdown";
import { getProducts } from "../../apis";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getDealDaily } from "../../store/products/productsSlice";
import { NavLink } from "react-router-dom";

let idInterval;

const DealDaily = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  const dispatch = useDispatch();
  const { dealDaily } = useSelector((state) => state.products);
  // console.log("dealDaily", dealDaily);

  const fetchDealDaily = async () => {
    const response = await getProducts({
      limit: 20,
    });

    if (response.success) {
      const pr = response.data.products[Math.round(Math.random() * 20)];
      dispatch(getDealDaily({ data: pr, time: Date.now() + 24 * 3600 * 1000 }));
    }
  };

  useEffect(() => {
    if (dealDaily?.time) {
      const deltaTime = dealDaily.time - Date.now();
      const number = secondsToHms(deltaTime);
      setHour(number.h);
      setMinute(number.m);
      setSecond(number.s);
    }
  }, [dealDaily]);
  useEffect(() => {
    idInterval && clearInterval(idInterval);
    if (
      moment(moment(dealDaily?.time).format("MM/DD/YYYY")).isBefore(moment())
    ) {
      fetchDealDaily();
    }
    // eslint-disable-next-line
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
        <span className="flex-1 "> </span>
        <span className="text-main md:text-[10px]  flex-8 text-[20px] text-center ">
          DEAL DAILY
        </span>
        <span className="flex-1 "></span>
      </div>
      <div className="w-full flex flex-col items-center gap-2">
        <img
          src={dealDaily?.data?.images[0] || ""}
          alt=""
          className="w-full object-cover md:max-w-[300px]"
        />

        <span className="line-clamp-1 text-center">{dealDaily?.name}</span>
        <span>{formatMoney(dealDaily?.data?.price)}</span>
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
          <NavLink to="/">View more...</NavLink>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
