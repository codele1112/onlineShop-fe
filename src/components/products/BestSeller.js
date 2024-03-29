import React, { useEffect, useState } from "react";
import { CustomSlider } from "../";

import { getProducts } from "../../apis";
import { getNewProducts } from "../../store/products/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

const tabs = [
  { id: 1, name: "best sellers" },
  { id: 2, name: "new products" },
];

function BestSeller() {
  const [bestSellers, setBestSellers] = useState(null);
  const [activatedTab, setActivatedTab] = useState(1);
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  const { isShowModal } = useSelector((state) => state.categories);
  const fetchProducts = async () => {
    const response = await getProducts({ sort: "-sold" });
    if (response?.success) {
      setBestSellers(response.data.products);
      setProducts(response.data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (activatedTab === 1) setProducts(bestSellers);
    if (activatedTab === 2) setProducts(newProducts);
    // eslint-disable-next-line
  }, [activatedTab]);

  return (
    <div className={clsx(isShowModal ? "hidden" : "block")}>
      <div className="flex text-[20px] md:text-[10px] ml-[-32px]">
        {tabs.map((el, index) => (
          <span
            key={index}
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
        <CustomSlider products={products} activedTab={activatedTab} />
      </div>
    </div>
  );
}

export default BestSeller;
