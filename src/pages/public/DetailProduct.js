import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../apis/products";
import { Breadcrumb, Button, SelectQuantity } from "../../components";
import Slider from "react-slick";
import { formatMoney } from "../../ultils/helpers";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

function DetailProduct() {
  const { pid, name, category } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async () => {
    const response = await getProductById(pid);
    console.log("product data", response);
    if (response.success) setProduct(response.data);
  };

  useEffect(() => {
    if (pid) fetchProductData();
  }, [pid]);

  const handleQuantity = useCallback(
    (number) => {
      console.log(number);
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => prev - 1);
      if (flag === "plus") setQuantity((prev) => prev + 1);
    },
    [quantity]
  );

  return (
    <div className="w-full px-2">
      <div className=" h-[81px] bg-gray-100 flex items-center justify-center">
        <div className="w-main">
          <h3 className="font-semibold">{name}</h3>
          <Breadcrumb name={name} category={category} />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex ">
        <div className=" w-1/2 flex-col flex ">
          <img
            src={product?.images[0]}
            alt="product"
            className="h-[458px] w-[458px] border object-cover"
          />
          <div className="w-[458px]">
            <Slider className="image-slider" {...settings}>
              {product?.images?.map((el, index) => (
                <div key={index} className="px-2">
                  <img
                    src={el}
                    alt="sub-product"
                    className="h-[143px] w-[143px] border object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="w-1/2 ">
          <h1 className="text-[30px] font-semibold">{name}</h1>

          <div className=" text-gray-500 mt-[50px] mb-[50px] ">
            <span>{product?.description}</span>
          </div>

          <div className="flex gap-2 mb-[30px]">
            <h2 className="text-[20px]  ">Price: </h2>
            <h4 className=" text-[20px] font-semibold text-amber-700">
              {formatMoney(product?.price)}
            </h4>
          </div>

          <SelectQuantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleChangeQuantity={handleChangeQuantity}
          />

          <button
            type="button"
            className=" flex gap-2 mt-20 items-center justify-center w-full bg-main hover:bg-gray-500 hover:text-black text-white font-medium py-2"
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="h-[500px] w-full"></div>
    </div>
  );
}

export default DetailProduct;
