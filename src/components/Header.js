import React from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";

function Header() {
  const {
    RiPhoneFill,
    MdEmail,
    LiaUserCogSolid,
    AiOutlineShoppingCart,
    RiBubbleChartLine,
  } = icons;
  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      <div className="flex">
        <Link to={`/${path.HOME}`} />
        <RiBubbleChartLine size={35} />
        <span className="text-[35px]"> SOAP & CANDLE</span>
      </div>

      <div className="flex text-[13px] ">
        <div className="flex flex-col items-center px-4 border-r">
          <span className="flex gap-4 items-center">
            <RiPhoneFill />
            <span className="font-semibold">(+1800) 0000 8098</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        <div className="flex flex-col items-center px-4 border-r">
          <span className="flex gap-4 items-center">
            <MdEmail />
            <span className="font-semibold">soap&candle@gmail.com</span>
          </span>
          <span>Online Support 24/7</span>
        </div>

        <div className="flex items-center justify-center gap-2 px-4 border-r cursor-pointer">
          <AiOutlineShoppingCart />
          <span>0 item(s)</span>
        </div>

        <div className="flex items-center justify-center px-6 gap-2 cursor-pointer">
          <LiaUserCogSolid size={24} />

          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
