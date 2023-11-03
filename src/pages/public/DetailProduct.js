import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../apis/products";
import { Breadcrumb } from "../../components";

function DetailProduct() {
  const { pid, name, category } = useParams();
  const [product, setProduct] = useState(null);
  const fetchProductData = async () => {
    const response = await getProductById(pid);
    // console.log("response", response);
    if (response.success) setProduct(response.data);
  };

  useEffect(() => {
    if (pid) fetchProductData();
  }, [pid]);
  return (
    <div className="w-full">
      <div className=" h-[81px] bg-gray-100 flex items-center justify-center">
        <div className="w-main">
          <h3>{name}</h3>
          <Breadcrumb name={name} category={category} />
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
