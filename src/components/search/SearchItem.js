import { memo, useState, useEffect } from "react";
import icons from "../../ultils/icons";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import path from "../../ultils/path";
import { getProducts } from "../../apis";
import { formatMoney } from "../../ultils/helpers";
import useDebounce from "../hooks/useDebounce";

const { AiOutlineDown } = icons;

const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState({ from: "", to: "" });
  const [highestPrice, setHighestPrice] = useState(null);
  const [params] = useSearchParams();

  const handleSelected = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
    changeActiveFilter(null);
  };

  const fetchHighestPriceProduct = async () => {
    const response = await getProducts({ sort: "-price", limit: 1 });
    // console.log("response highest price", response);
    if (response.success) setHighestPrice(response?.data?.products[0].price);
  };

  const debouncePriceFrom = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);

  useEffect(() => {
    if (selected.length > 0) {
      let param = [];
      for (let i of params.entries()) param.push(i);
      const queries = {};
      for (let i of param) queries[i[0]] = i[1];
      if (Number(price.from) > 0) queries.from = price.from;
      if (Number(price.from) > 0) queries.to = price.to;
      queries.page = 1;
      navigate({
        pathname: `/${path.PRODUCTS}`,
        search: createSearchParams({
          category: selected.join(","),
        }).toString(),
      });
    } else {
      navigate(`/${path.PRODUCTS}`);
    }
    // eslint-disable-next-line
  }, [selected]);

  useEffect(() => {
    if (type === "input") fetchHighestPriceProduct();
  }, [type]);

  useEffect(() => {
    if (price.from && price.to && price.from > price.to)
      alert("From price cannot greater than To price");
  }, [price]);

  useEffect(() => {
    const data = {};
    if (Number(price.from) > 0) data.from = price.from;
    if (Number(price.from) > 0) data.to = price.to;

    navigate({
      pathname: `/${path.PRODUCTS}`,
      search: createSearchParams(data).toString(),
    });
    // eslint-disable-next-line
  }, [debouncePriceFrom, debouncePriceTo]);

  return (
    <div
      onClick={() => changeActiveFilter(name)}
      className="p-3 text-xs text-gray-500 relative border border-gray-800 flex justify-between items-center cursor-pointer"
    >
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div className="absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 bg-white border min-w-[150px]">
          {type === "checkbox" && (
            <div>
              <div className="p-4 flex items-center justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                  className="underline cursor-pointer hover:text-second"
                >
                  Reset
                </span>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-3 mt-4"
              >
                {categories.map((el, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="form-checkbox text-red-800"
                      id={el.name}
                      value={el.name}
                      onChange={handleSelected}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el.name
                      )}
                    />
                    <label
                      htmlFor={el.name}
                      className="capitalize text-gray-700"
                    >
                      {el.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-4 flex items-center justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`The highest price is ${formatMoney(
                  highestPrice
                )}`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({ from: "", to: "" });
                    changeActiveFilter(null);
                  }}
                  className="underline cursor-pointer hover:text-second"
                >
                  Reset
                </span>
              </div>

              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2 ">
                  <label htmlFor="from">From</label>
                  <input
                    className="form-input"
                    type="number"
                    id="from"
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2 ">
                  <label htmlFor="to">To</label>
                  <input
                    className="form-input"
                    type="number"
                    id="to"
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
