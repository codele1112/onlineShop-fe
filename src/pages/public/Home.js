import React from "react";
import {
  Banner,
  Sidebar,
  BestSeller,
  DealDaily,
  FeatureProducts,
} from "../../components";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { isLoggedIn, current } = useSelector((state) => state.user);

  // console.log({ isLoggedIn, current });
  return (
    <>
      <div className="w-main flex mt-6">
        <div className="flex flex-col gap-5 w-[25%] flex-auto ">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
          <Banner />
          <BestSeller />
        </div>
      </div>

      <div className="my-8">
        <FeatureProducts />
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  );
};

export default Home;
