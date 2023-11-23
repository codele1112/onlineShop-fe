import React, { useCallback, useEffect, useState } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { getProductById, getProducts } from "../../apis/products";
import {
  Breadcrumb,
  SelectQuantity,
  CustomSlider,
  Button,
} from "../../components";
import Slider from "react-slick";
import { formatMoney } from "../../ultils/helpers";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateCart } from "../../apis";
import { toast } from "react-toastify";
import path from "../../ultils/path";
import { getCurrentUser } from "../../store/user/asyncActions";

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
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProductData = async () => {
    const response = await getProductById(pid);
    // console.log("product data", response);
    if (response.success) setProduct(response.data);
  };

  const fetchProducts = async () => {
    const response = await getProducts();
    // console.log("products data", response);
    if (response.success) setRelatedProducts(response.data.products);
  };
  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
  }, [pid]);

  const handleQuantity = useCallback((number) => {
    console.log(number);
    if (!Number(number) || Number(number) < 1) {
      return;
    } else {
      setQuantity(number);
    }
  }, []);

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );

  const handleAddtoCart = async () => {
    if (!current)
      Swal.fire({
        title: "ALmost...",
        text: "Please login first!",
        icon: "info",
        cancelButtonText: "Not now!",
        showCancelButton: true,
        confirmButtonText: "Go to login page",
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
        // navigate({
        //   pathname: `/${path.LOGIN}`,
        //   search: createSearchParams({
        //     redirect: pathname,
        //   }).toString(),
        // });
      });
    const response = await updateCart({ pid, quantity, price: product.price });
    // console.log("response", response);
    if (response.success) {
      toast.success("The product has been added to cart!");
      dispatch(getCurrentUser());
    } else toast.error(response.mes);
  };
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

          <div className="w-[458px] mt-4">
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

          <div className="mt-[50px] mb-[50px] flex items-center gap-1">
            <h2 className="text-base  ">Stock: </h2>
            <span className=" text-base text-gray-700">
              {product?.quantity}
            </span>
          </div>

          <div className="flex gap-2 mb-[30px]">
            <h2 className="text-base  ">Price: </h2>
            <span className=" text-base font-semibold text-amber-700">
              {formatMoney(product?.price)}
            </span>
          </div>

          <div className="flex flex-col gap-8">
            <SelectQuantity
              originalQuantity={quantity}
              handleQuantity={handleQuantity}
              handleChangeQuantity={handleChangeQuantity}
            />

            <Button
              fw
              children={"Add to cart"}
              handleOnClick={handleAddtoCart}
            />
          </div>
        </div>
      </div>
      <div className=" w-main m-auto mt-8">
        <h3 className="border-b-2  border-main text-[20px] py-[15px] text-center ">
          YOU MAY ALSO LIKE
        </h3>
        <CustomSlider products={relatedProducts} />
      </div>
      <div className="h-[500px] w-full"></div>
    </div>
  );
}

export default DetailProduct;
