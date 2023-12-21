import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { getCurrentUser } from "../../store/user/asyncActions";
import { userLogout } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../store/redux";
import icons from "../../ultils/icons";

const { FiLogOut } = icons;

const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) getCurrentUser();
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) getUserProfile();
    // eslint-disable-next-line
  }, [dispatch, isLoggedIn]);

  async function getUserProfile() {
    dispatch(getCurrentUser());
    await persistor.flush();
  }
  return (
    <div className=" w-full  h-[40px] bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span className="md:invisible md:max-w-[200px]">
          ORDER ONLINE OR CALL US (+1800) 000 9098
        </span>

        {isLoggedIn ? (
          <div className="flex gap-2 ">
            <span className="text-base sm:text-[10px]">
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
