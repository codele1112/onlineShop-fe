import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../apis";
const FeatureProducts = () => {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await getProducts({
      limit: 6,
      sort: "-totalRatings",
    });
    if (response.success) setProducts(response.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-main md:max-w-[390px] lg:max-w-[768px]">
      <h3 className=" font-semibold border-b-2 border-main text-[20px] md:text-[10px] py-[15px]">
        FEATURE PRODUCTS
      </h3>
      <div className=" md:max-w-[390px] md:flex md:flex-col flex flex-wrap mt-10  mx-[-10px] md:mx-[10px] lg:mx-[10px]">
        {products?.map((el) => (
          <ProductCard
            key={el._id}
            pid={el._id}
            image={el.thumb || el.images[0]}
            {...el}
          />
        ))}
      </div>

      <div className="w-1/3 md:hidden  flex justify-between gap-2  mt-8  ">
        <img
          src="https://i.pinimg.com/564x/cd/75/32/cd7532cf046bdad46cee22e4b54851c5.jpg"
          alt="soaps"
        />

        <img
          src="https://i.pinimg.com/564x/0c/b0/c6/0cb0c615a817a293c289298eb0593ee8.jpg"
          alt=""
          className="object-contain"
        />

        <img
          src="https://i.pinimg.com/564x/1e/ea/25/1eea25a2d508c15ad59277bc08c6fa49.jpg"
          alt="candles"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default FeatureProducts;
