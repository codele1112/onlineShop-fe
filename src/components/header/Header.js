import React, { Fragment, useEffect, useState } from "react";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../../store/categories/categoriesSlice";
import { userLogout } from "../../store/user/userSlice";

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
      <div className="w-main md:max-w-[390px] lg:max-w-[768px] flex justify-between items-center ">
        <div className="  flex text-center gap-0 ">
          <Link to={`/${path.HOME}`} />
          <RiBubbleChartLine size={35} />
          <span className="text-[35px] md:text-[15px]">SOAP & CANDLE</span>
        </div>

        <div className="flex text-[10px] ">
          <div className=" md:hidden lg:hidden flex flex-col items-center px-4 border-r">
            <span className="flex  gap-4 items-center">
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

              <div
                id="profile"
                className="flex items-center justify-center cursor-pointer px-6 gap-2 relative"
                onClick={(e) => {
                  setIsShowOption((prev) => !prev);
                }}
              >
                <LiaUserCogSolid size={24} />
                <span>Profile</span>
                {/* {console.log("isShowOption", isShowOption)} */}
                {isShowOption && (
                  <div className=" flex flex-col absolute top-full left-0 bg-gray-100 border min-w-[100px] py-2">
                    {current?.role === "user" && (
                      <Link
                        className="p-2 w-full hover:bg-sky-100"
                        to={`/${path.MEMBER}/${path.PERSONAL}`}
                        onClick={() => setIsShowOption(false)}
                      >
                        Personal
                      </Link>
                    )}
                    {current?.role === "admin" && (
                      <Link
                        className="p-2 w-full hover:bg-sky-100"
                        to={`/${path.ADMIN}/${path.DASHBOARD}`}
                        onClick={() => setIsShowOption(false)}
                      >
                        Admin workspace
                      </Link>
                    )}
                    <span
                      onClick={() => dispatch(userLogout())}
                      className="p-2 w-full hover:bg-sky-100"
                    >
                      Logout
                    </span>
                  </div>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
