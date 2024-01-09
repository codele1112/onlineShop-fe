import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";
import { AdminSidebar } from "../../components";

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  // console.log(isLoggedIn, current);
  if (!isLoggedIn || !current || current?.role !== "admin")
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="flex w-full min-h-screen relative">
      <div className="w-1/6 top-0 bottom-0 flex-none ">
        <AdminSidebar />
      </div>
      {/* <div className=" w-1/6 "></div> */}
      <div className=" w-5/6 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
