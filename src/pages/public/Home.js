import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import {
  Banner,
  Sidebar,
  BestSeller,
  DealDaily,
  FeatureProducts,
  CustomSlider,
} from "../../components";

const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { isLoggedIn, current } = useSelector((state) => state.user);
  // console.log("newProducts", newProducts);

  return (
    <div className="w-full">
      <div className="w-main lg:max-w-[768px] md:max-w-[390px] flex md:flex md:flex-col justify-between mt-6">
        <div className=" flex flex-col gap-5 md:w-full w-[25%] flex-auto ">
          <Sidebar />
          <DealDaily />
        </div>

        <div className="flex flex-col gap-5 pl-5  md:w-full w-[75%] flex-auto ">
          <Banner />
          <BestSeller />
        </div>
      </div>

      <div className="w-full  my-8">
        <FeatureProducts />
      </div>

      <div className="my-8 w-main md:max-w-[390px] lg:max-w-[768px]">
        <h3 className="font-semibold border-b-2 md:text-[10px] border-main text-[20px] py-[15px]">
          NEW ARRIVALS
        </h3>
        <div className="w-full  mt-8">
          <CustomSlider products={newProducts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
