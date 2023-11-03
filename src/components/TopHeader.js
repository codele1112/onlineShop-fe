import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../ultils/path";
import { getCurrentUser } from "../store/user/asyncActions";
import { userLogout } from "../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import icons from "../ultils/icons";

const { FiLogOut } = icons;
const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  // console.log("isLoggedIn", isLoggedIn);
  // console.log("accessToken", token);

  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrentUser());
  }, [dispatch, isLoggedIn]);

  return (
    <div className=" h-[38px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span>ORDER ONLINE OR CALL US (+1800) 000 9098</span>

        {isLoggedIn ? (
          <div className="flex gap-2">
            <span className="text-base">
              {`Welcome, ${current?.name ? current.name : ""}  `}!
            </span>
            <span
              onClick={() => {
                dispatch(userLogout());
              }}
              className=" hover:bg-gray-300 hover:text-main cursor-pointer"
            >
              <FiLogOut color="#fff" size={20} />
            </span>
          </div>
        ) : (
          <Link className="hover:text-gray-300" to={`/${path.LOGIN}`}>
            Sign in or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
