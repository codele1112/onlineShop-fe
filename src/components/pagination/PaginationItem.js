import React from "react";
import clsx from "clsx";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import path from "../../ultils/path";

const PaginationItem = ({ children }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePagination = () => {
    const queries = Object.fromEntries([...params]);
    if (Number(children)) queries.page = children;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <button
      type="button"
      disabled={!Number(children)}
      className={clsx(
        "w-10 h-10 cursor-pointer flex justify-center p-4 hover:rounded-full hover:bg-gray-300",
        !Number(children) && "items-end pb-2",
        Number(children) && "items-center",
        +params.get("page") === +children && "rounded-full bg-gray-300 ",
        !+params.get("page") && children === 1 && "rounded-full bg-gray-300 "
      )}
      onClick={handlePagination}
    >
      {children}
    </button>
  );
};

export default PaginationItem;
