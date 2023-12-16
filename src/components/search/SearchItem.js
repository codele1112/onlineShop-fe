import React, { memo, useState, useEffect } from "react";
import icons from "../../ultils/icons";
import { useNavigate, createSearchParams, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import path from "../../ultils/path";

const { AiOutlineDown } = icons;

const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  // const { category } = useParams();
  const { categories } = useSelector((state) => state.categories);
  // console.log("category", categories[0].name);
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [bestPrice, setBestPrice] = useState(null);

  const handleSelected = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
  };
  console.log(selected);

  useEffect(() => {
    navigate({
      pathname: `/${path.PRODUCTS}`,
      search: createSearchParams({
        category: selected,
      }).toString(),
    });
  }, [selected]);
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
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
