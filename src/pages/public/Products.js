import React, { useEffect, useState, useCallback } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Product, SearchItem, InputSelect, Pagination } from "../../components";
import { getProducts } from "../../apis";
import Masonry from "react-masonry-css";
import { sorts } from "../../ultils/contants";
import path from "../../ultils/path";

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const { category } = useParams();
  // const { categories } = useSelector((state) => state.categories);
  const [params] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [sort, setSort] = useState(null);
  const navigate = useNavigate();

  const fetchProductByCategory = async (queries) => {
    if (category && category !== "products") queries.category = category;

    const response = await getProducts(queries);

    if (response.success) setProducts(response.data);
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of params) queries[i[0]] = i[1];

    let priceQuery = {};

    if (queries.from && queries.to) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    }
    if (queries.from) queries.price = { gte: queries.from };
    if (queries.to) queries.price = { lte: queries.to };

    delete queries.to;
    delete queries.from;
    const q = { ...priceQuery, ...queries };

    fetchProductByCategory(q);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [params]);

  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );

  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    // eslint-disable-next-line
    [sort]
  );

  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${path.PRODUCTS}`,
        search: createSearchParams({ sort }).toString(),
      });
    }
    // eslint-disable-next-line
  }, [sort]);
  return (
    <div className=" w-full md:max-w-[350px]  lg:max-w-[750px]">
      <div className=" h-[81px] bg-gray-100 flex items-center justify-center">
        <div className="text-bold pl-2 md:pl-2 lg:pl-2 w-main md:max-w-[350px]">
          PRODUCTS
        </div>
      </div>

      <div className="w-main md:max-w-[350px] lg:max-w-[750px] md:flex md:flex-col border p-4 md:p-0 flex justify-between mt-8 m-auto">
        <div className="w-4/5 flex-auto flex flex-col">
          <span className="font-semibold text-sm">Filter By</span>
          <div className="flex gap-4">
            <SearchItem
              name="price"
              type="input"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            />

            <SearchItem
              name="category"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            />
          </div>
        </div>

        <div className="w-1/5 flex flex-auto flex-col gap-3">
          <span className="font-semibold text-sm">Sort by</span>
          <div className="w-full">
            <InputSelect
              value={sort}
              options={sorts}
              changValue={changeValue}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 w-main md:max-w-[390px] lg:max-w-[768px] m-auto">
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

      {products?.products?.length > 0 && (
        <div className="md:max-w-[390px] lg:max-w-[768px] w-main m-auto my-10 flex justify-end ">
          <Pagination totalCount={products?.count} />
        </div>
      )}
    </div>
  );
};

export default Products;
