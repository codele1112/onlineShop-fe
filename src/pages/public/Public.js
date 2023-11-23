import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, TopHeader, Footer } from "../../components";

const Public = () => {
  // console.log("public");
  return (
    <div className="flex flex-col items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="flex flex-col items-center ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
