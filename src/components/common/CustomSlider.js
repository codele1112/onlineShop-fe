import React, { memo } from "react";
import Slider from "react-slick";
import Product from "../products/Product";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const CustomSlider = ({ products, activedTab }) => {
  return (
    <div className="md:max-w-[390px]">
      {products && (
        <Slider className="custom-slider " {...settings}>
          {products?.map((el, index) => (
            <Product
              key={index}
              pid={el._id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default memo(CustomSlider);
