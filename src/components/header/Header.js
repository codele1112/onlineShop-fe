import React, { Fragment, useEffect, useState } from "react";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../../store/categories/categoriesSlice";

const {
  RiPhoneFill,
  MdEmail,
  LiaUserCogSolid,
  AiOutlineShoppingCart,
  RiBubbleChartLine,
} = icons;

const Header = () => {
  const { current } = useSelector((state) => state.user);
  console.log("current", current);
  const [isShowOption, setIsShowOption] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById("profile");
      if (!profile?.contains(e.target)) setIsShowOption(false);
    };
    document.addEventListener("click", handleClickoutOptions);
    return () => {
      document.removeEventListener("click", handleClickoutOptions);
    };
  }, []);
  return (
    <div className="w-full flex items-center justify-center h-[110px] py-[35px]">
      <div className="w-main flex justify-between items-center ">
        <div className="  flex text-center ">
          <Link to={`/${path.HOME}`} />
          <RiBubbleChartLine size={35} />
          <span className="text-[35px] md:text-[15px]">SOAP & CANDLE</span>
        </div>

        <div className="flex text-[13px] ">
          <div className=" md:hidden flex flex-col items-center px-4 border-r">
            <span className="flex gap-4 items-center">
              <RiPhoneFill />
              <span className="font-semibold">(+1800) 0000 8098</span>
            </span>
            <span>Mon-Sat 9:00AM - 8:00PM</span>
          </div>

          <div className="md:hidden flex flex-col items-center px-4 border-r">
            <span className="flex gap-4 items-center">
              <MdEmail />
              <span className="font-semibold">soap&candle@gmail.com</span>
            </span>
            <span>Online Support 24/7</span>
          </div>

          {current && (
            <Fragment>
              <div
                onClick={() => dispatch(showCart())}
                className="flex items-center justify-center gap-2 px-4 border-r cursor-pointer"
              >
                <AiOutlineShoppingCart />
                <span>{`${current?.cart?.length || 0} item(s)`}</span>
              </div>

              <Link
                to={
                  current?.role === "admin"
                    ? `/${path.ADMIN}/${path.DASHBOARD}`
                    : `/${path.MEMBER}/${path.PERSONAL}`
                }
                className="flex items-center justify-center px-6 gap-2 cursor-pointer"
              >
                <LiaUserCogSolid size={24} />

                <span>Profile</span>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
