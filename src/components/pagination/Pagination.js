import React, { memo } from "react";
import { useSearchParams } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import PaginationItem from "./PaginationItem";

const Pagination = ({ totalCount }) => {
  // console.log("totalCount", totalCount);
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get("page") || 1);

  // console.log({ pagination });

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +process.env.REACT_APP_PRODUCT_LIMIT || 10;
    const start = Math.min((currentPage - 1) * pageSize + 1, totalCount);
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end}`;
  };
  return (
    <div className="flex w-main justify-between items-center">
      {!+params.get("page") ? (
        <span className="text-sm italic">
          {`Show products 1-${
            Math.min(+process.env.REACT_APP_PRODUCT_LIMIT, totalCount) || 10
          } of ${totalCount}`}
        </span>
      ) : (
        ""
      )}
      {+params.get("page") ? (
        <span className="text-sm italic">{`Show products ${range()} of ${totalCount}`}</span>
      ) : (
        ""
      )}

      <div className="flex items-center">
        {pagination?.map((el) => (
          <PaginationItem key={el}>{el}</PaginationItem>
        ))}
      </div>
    </div>
  );
};

export default memo(Pagination);
