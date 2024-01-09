import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";
import { MemberSidebar } from "../../components";

const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="flex w-full min-h-screen relative">
      <div className="w-1/6 top-0 bottom-0 flex-none ">
        <MemberSidebar />
      </div>

      {/* <div className="w-[250px] "></div> */}
      <div className=" w-5/6 ">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
