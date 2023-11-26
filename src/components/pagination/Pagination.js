import React from "react";
import { useSearchParams } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import PaginationItem from "./PaginationItem";

const Pagination = ({ totalCount }) => {
  console.log(usePagination(66, 2));
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, 2);

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +process.env.REACT_APP_PRODUCT_LIMIT || 10;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end}`;
  };
  return (
    <div className="flex w-main justify-between items-center">
      {!+params.get("page") && (
        <span className="text-sm italic">
          {`Show products: 1-${
            +process.env.REACT_APP_PRODUCT_LIMIT || 10
          } of ${totalCount}`}{" "}
        </span>
      )}
      {!+params.get("page") && (
        <span className="text-sm italic">{`Show products ${range()} of ${totalCount}`}</span>
      )}

      <div className="flex items-center">
        {pagination?.map((el) => (
          <PaginationItem key={el}>{el}</PaginationItem>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
