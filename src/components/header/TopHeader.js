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
    <div className=" w-full py-8 md:py-4 h-[40px] bg-gray-300 flex items-center justify-center">
      <div className="w-main   lg:px-2 flex items-center text-center justify-between text-xs font-mono">
        <span className="md:invisible md:max-w-[200px]">
          ORDER ONLINE OR CALL US (+1800) 000 9098
        </span>

        {isLoggedIn ? (
          <div className="flex justify-center items-center gap-2 font-mono ">
            <span className="text-base sm:text-[10px] text-center">
              {`Welcome, ${current?.name ? current.name : ""}  `}!
            </span>
            <span
              onClick={() => {
                dispatch(userLogout());
              }}
              className=" hover:bg-gray-300 hover:text-main cursor-pointer"
            >
              <FiLogOut size={20} />
            </span>
          </div>
        ) : (
          <Link className="hover:text-yellow-800" to={`/${path.LOGIN}`}>
            Sign in or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
