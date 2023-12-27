import React, { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getProductById, getProducts } from "../../apis/products";

import {
  Breadcrumb,
  SelectQuantity,
  CustomSlider,
  Button,
  Rating,
  Votebar,
} from "../../components";
import Slider from "react-slick";
import { formatMoney } from "../../ultils/helpers";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateCart } from "../../apis";
import { toast } from "react-toastify";
import path from "../../ultils/path";
import { getCurrentUser } from "../../store/user/asyncActions";
import DOMPurify from "dompurify";
import clsx from "clsx";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

function DetailProduct({ isQuickview, data }) {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [pid, setPid] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("data", data);
  useEffect(() => {
    if (data && data.pid) {
      setPid(data.pid);
      setCategory(data.category);
    } else if (params && params.pid) {
      setPid(params.pid);
      setCategory(params.category);
    }
  }, [data, params]);

  const fetchProductData = async () => {
    const response = await getProductById(pid);
    // console.log("response", response.data.thumb);
    if (response.success) setProduct(response.data);
    setCurrentImage(response.data?.thumb || response.data?.images[0]);
  };
  // console.log("product", product);

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
    window.scrollTo(0, 0);
    // eslint-disable-next-line
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

  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };

  const handleAddtoCart = async () => {
    if (!current)
      Swal.fire({
        title: "Almost...",
        text: "Please login first!",
        icon: "info",
        cancelButtonText: "Not now!",
        showCancelButton: true,
        confirmButtonText: "Go to login page",
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
        navigate({
          pathname: `/${path.LOGIN}`,
          search: createSearchParams({
            redirect: location.pathname,
          }).toString(),
        });
      });
    const response = await updateCart({ pid, quantity, price: product.price });
    // console.log("response", response);
    if (response.success) {
      toast.success("The product has been added to cart!");
      dispatch(getCurrentUser());
    } else toast.error(response.mes);
  };

  return (
    <div className="w-full md:max-w-[390px]  lg:max-w-[768px] px-2">
      {!isQuickview && (
        <div className=" h-[81px] bg-gray-100 flex items-center justify-center">
          <div className="w-main md:max-w-[390px] lg:max-w-[768px] pl-2 lg:pl-2">
            <h3 className="font-semibold md:text-[10px]">{product?.name}</h3>
            <Breadcrumb name={product?.name} category={category} />
          </div>
        </div>
      )}

      <div
        className={clsx(
          "  bg-white md:max-w-[390px] md:flex md:flex-col lg:flex-col lg:max-w-[700px] m-auto mt-4 flex",
          isQuickview
            ? "w-main md:max-w-[390px] px-2 py-2 "
            : "w-main md:max-w-[390px]"
        )}
      >
        <div className="md:w-full lg:w-full w-1/2  lg:flex lg:flex-col flex-col flex ">
          <img
            src={currentImage}
            alt="product"
            className="h-[458px] w-[458px] md:w-[150px] md:h-[150px] lg:w-[300px] lg:h-[300px] lg:mx-auto border object-cover"
          />

          <div className="w-[458px] md:max-w-[360px] lg:max-w-[700px] mt-4 lg:mx-auto">
            <Slider className="image-slider" {...settings}>
              {product?.images?.map((el, index) => (
                <div key={index} className="px-2">
                  <img
                    onClick={(e) => handleClickImage(e, el)}
                    src={el}
                    alt="sub-product"
                    className="h-[143px] w-[143px] lg:w-[150px] lg:h-[150px]  border object-cover cursor-pointer"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className=" w-1/2 md:w-full lg:w-full  md:max-w-[390px] lg:max-w-[768px] ">
          <h1 className="text-[30px] md:text-[15px] font-semibold">
            {product?.name}
          </h1>

          <div className=" md:max-w-[390px] lg:max-w-[768px] lg:text-[15px] font-mono md:mt-[20px] mt-[25px] mb-[50px] ">
            <span>
              {product?.description && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.description),
                  }}
                ></div>
              )}
            </span>
          </div>

          <div className="mt-[30px] mb-[50px] flex items-center gap-1">
            <h2 className="text-base">In Stock: </h2>
            <span className=" text-base text-gray-700 ">
              {product?.quantity}
            </span>
          </div>

          <div className="  mt-[30px] mb-[50px] flex items-center gap-1">
            <h2 className="text-base">Sold: </h2>
            <span className=" text-base text-gray-700 ">{product?.sold}</span>
          </div>

          <div className="flex gap-2 mb-[30px]">
            <h2 className="text-base  ">Price: </h2>
            <span className=" text-base font-semibold text-amber-700">
              {formatMoney(product?.price)}
            </span>
          </div>

          <div className="flex flex-col gap-8 md:max-w-[380px] lg:max-w-[768px] md:flex md:justify-center md:items-center ">
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

      {!isQuickview && (
        <div className="  flex w-main md:max-w-[390px] lg:max-w-[768px] m-auto mt-10 gap-2 p-4 border-b border-t">
          <div className="flex-4 flex items-center justify-center ">
            <Rating totalRatings={4} totalCount={18} />
          </div>
          <div className="flex-6 flex flex-col gap-4 ">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el) => (
                <Votebar
                  key={el}
                  number={el + 1}
                  ratingCount={33}
                  ratingTotal={35}
                />
              ))}
          </div>
        </div>
      )}

      {!isQuickview && (
        <div className=" w-main md:max-w-[390px] lg:max-w-[768px] m-auto mt-8 mb-8">
          <h3 className="border-b-2  border-main text-[20px] py-[15px] text-center ">
            YOU MAY ALSO LIKE
          </h3>
          <CustomSlider products={relatedProducts} />
        </div>
      )}
    </div>
  );
}

export default DetailProduct;
