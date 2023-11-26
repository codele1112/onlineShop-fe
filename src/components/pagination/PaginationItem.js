import React from "react";
import clsx from "clsx";

const PaginationItem = ({ children }) => {
  return (
    <div
      className={clsx(
        "w-10 h-10 cursor-pointer flex justify-center p-4 hover:rounded-full hover:bg-gray-300",
        !Number(children) && "items-end",
        Number(children) && "items-center"
      )}
    >
      {children}
    </div>
  );
};

export default PaginationItem;
