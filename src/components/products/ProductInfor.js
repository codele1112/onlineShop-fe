import React from "react";
import { productInfoTabs } from "../../ultils/contants";
const ProductInfor = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        {productInfoTabs.map((el) => (
          <span className="p-2 bg-gray-300" key={el.id}>
            {el.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductInfor;
