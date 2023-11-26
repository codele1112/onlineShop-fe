import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Pagination, Product, SearchItem } from "../../components";
import { getProducts } from "../../apis";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  // console.log("category", category);

  const fetchProductByCategory = async (queries) => {
    const response = await getProducts(queries);
    if (response.success) setProducts(response.data);
    console.log("response", response);
  };

  useEffect(() => {
    fetchProductByCategory();
  }, []);

  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );

  return (
    <div className="w-full md:max-w-[390px]">
      <div className=" h-[81px] bg-gray-100 flex items-center justify-center">
        <div className="w-main md:max-w-[390px]">
          <h3 className="uppercase">{category}</h3>
          <Breadcrumb category={category} />
        </div>
      </div>

      <div className="w-main md:max-w-[390px] md:flex md:flex-col border p-4 md:p-0 flex justify-between mt-8 m-auto">
        <div className="w-4/5 flex-auto flex flex-col ">
          <span className="font-semibold text-sm">Filter By </span>
          <SearchItem
            name="price"
            activeClick={activeClick}
            changeActiveFilter={changeActiveFilter}
          />
        </div>

        <div className="w-1/5 flex">Sort by</div>
      </div>

      <div className="mt-8 w-main md:max-w-[390px] m-auto  ">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-10px] "
          columnClassName="my-masonry-grid_column"
        >
          {products?.products?.map((el, index) => (
            <Product key={index} pid={el.id} productData={el} />
          ))}
        </Masonry>
      </div>

      {/* <div className="w-main m-auto my-4 flex justify-end ">
        <Pagination totalCount={products?.count} />
      </div> */}
    </div>
  );
};

export default Products;
