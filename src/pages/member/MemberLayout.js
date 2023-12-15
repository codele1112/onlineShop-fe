import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";
import { MemberSidebar } from "../../components";
import avatarDefault01 from "../../assets/avatarDefault01.jpeg";

const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className=" flex w-full md:max-w-[390px] min-h-screen relative">
      <div className="w-[250px] top-0 bottom-0 flex-none fixed">
        <MemberSidebar />
      </div>

      <div className="w-[250px] "></div>
      <div className="flex-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
