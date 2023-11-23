import React, { memo, useState, useEffect } from "react";
import icons from "../../ultils/icons";
import { useNavigate, createSearchParams, useParams } from "react-router-dom";

const { AiOutlineDown } = icons;

const SearchItem = ({ name, activeClick, changeActiveFilter }) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [selected, setSelected] = useState({
    form: "",
    to: "",
  });
  const [price, setPrice] = useState([0, 0]);
  const [bestPrice, setBestPrice] = useState(null);

  useEffect(() => {
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({}).toString(),
    });
  }, [selected]);
  return (
    <div
      onClick={() => changeActiveFilter(name)}
      className="p-4 w-[200px] text-xs text-gray-500 relative border border-gray-800 flex justify-between items-center "
    >
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div className="absolute top-full left-0 w-fit p-4">content</div>
      )}
    </div>
  );
};

export default memo(SearchItem);
