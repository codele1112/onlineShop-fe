import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "./Product";
import { getProducts } from "../apis";

const tabs = [
  { id: 1, name: "best sellers" },
  { id: 2, name: "new products" },
];

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
function BestSeller() {
  const [bestSellers, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activatedTab, setActivatedTab] = useState(1);
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await Promise.all([
      getProducts({ sort: "-sold" }),
      getProducts({ sort: "-createdAt" }),
    ]);
    // console.log("bestseller", response[0]?.success);
    // console.log("bestseller", response[0].data.products);

    if (response[0]?.success) setBestSellers(response[0].data.products);
    if (response[1]?.success) setNewProducts(response[1].data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  // console.log(bestSellers);

  useEffect(() => {
    if (activatedTab === 1) setProducts(bestSellers);
    if (activatedTab === 2) setProducts(newProducts);
  }, [activatedTab]);

  return (
    <div>
      <div className="flex text-[20px]  ml-[-32px]">
        {tabs.map((el, id) => (
          <span
            key={id}
            className={`font-semibold uppercase px-8 cursor-pointer border-r text-gray-400 ${
              activatedTab === el.id ? "text-main" : ""
            }`}
            onClick={() => setActivatedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 border-t-2 border-main pt-4">
        <Slider {...settings}>
          {bestSellers?.map((el) => (
            <Product key={el._id} productData={el} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default BestSeller;
