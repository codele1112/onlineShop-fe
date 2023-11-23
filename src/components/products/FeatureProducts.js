import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../apis";
import Product from "./Product";
const FeatureProducts = () => {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await getProducts({
      limit: 6,
    });
    // console.log("feature products", response);
    if (response.success) setProducts(response.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-main">
      <h3 className=" font-semibold border-b-2 border-main text-[20px] py-[15px]">
        FEATURE PRODUCTS
      </h3>
      <div className="flex flex-wrap mt-10  mx-[-10px]  ">
        {products?.map((el) => (
          <ProductCard
            key={el._id}
            image={el.images[0]}
            name={el.name}
            price={el.price}
          />
        ))}
      </div>

      <div className="w-1/3 flex justify-between gap-2  mt-8  ">
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
