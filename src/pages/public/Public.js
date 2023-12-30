import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, TopHeader, Footer } from "../../components";

const Public = () => {
  return (
    <div className="flex flex-col items-center max-h-screen overflow-auto">
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
