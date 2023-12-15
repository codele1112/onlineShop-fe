import React, { useState } from "react";
import { formatMoney } from "../../ultils/helpers";
import { Link, useNavigate } from "react-router-dom";
import SelectOption from "../common/SelectOption";
import { showModal } from "../../store/categories/categoriesSlice";
import DetailProduct from "../../pages/public/DetailProduct";
import icons from "../../ultils/icons";
import { updateCart } from "../../apis";
import { getCurrentUser } from "../../store/user/asyncActions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "../../ultils/path";

const { AiFillEye, AiFillHeart, BsFillCartPlusFill, BsFillCartCheckFill } =
  icons;

const Product = ({ productData }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("current", current);
  // console.log("productData", productData);

  const handleClickOptions = async (e, flag) => {
    e.stopPropagation();

    if (flag === "CART") {
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
        });

      const response = await updateCart({ pid: productData._id });
      if (response.success) {
        toast.success(response.mes);
        dispatch(getCurrentUser());
      } else toast.error(response.mes);
    }

    if (flag === "WISHLIST") {
    }

    if (flag === "QUICK_VIEW") {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <DetailProduct
              isQuickview
              data={productData?._id}
              category={productData?.category.name}
            />
          ),
        })
      );
    }
  };
  return (
    <div className="w-full md:max-w-[390px] lg:max-w-[768px] text-base pr-5 px-[10px]">
      <div
        className="w-full border p-[15px] md:text-[8px] flex flex-col items-center "
        onClick={(e) =>
          navigate(
            `/${productData?.category?.name}/${productData?._id}/${productData?.name}`
          )
        }
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative ">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0  gap-2 flex justify-center items-center animate-slide-top ">
              <span
                title="Add to wishlist"
                onClick={(e) => handleClickOptions(e, "WISHLIST")}
              >
                <SelectOption icon={<AiFillHeart />} />
              </span>
              {current?.cart?.some(
                (el) => el.product === productData._id.toString()
              ) ? (
                <span title="Added to cart">
                  <SelectOption icon={<BsFillCartCheckFill color="green" />} />
                </span>
              ) : (
                <span
                  title="Add to cart"
                  onClick={(e) => handleClickOptions(e, "CART")}
                >
                  <SelectOption icon={<BsFillCartPlusFill />} />
                </span>
              )}

              <span
                title="Quick view"
                onClick={(e) => handleClickOptions(e, "QUICK_VIEW")}
              >
                <SelectOption icon={<AiFillEye />} />
              </span>
            </div>
          )}

          <img
            src={productData?.images[0] || ""}
            alt=""
            className="w-full object-cover h-[300px] md:max-w-[100px] md:max-h-[100px] lg:max-w-[200px] lg:max-h-[200px] "
          />
        </div>
        <div className="flex flex-col gap-1  mt-[15px] items-start w-full ">
          <span className="line-clamp-1">{productData?.name}</span>
          <span>{formatMoney(productData?.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
