import React, { useEffect, useRef } from "react";
import icons from "../../ultils/icons";
const { AiFillStar } = icons;
const Votebar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef();
  useEffect(() => {
    percentRef.current.style.cssText = `right:${
      100 - Math.round((ratingCount * 100) / ratingTotal)
    }%`;
  }, [ratingCount, ratingTotal]);
  return (
    <div className="flex items-center gap-2 text-gray-600">
      <div className="flex w-[10%] items-center justify-center gap-1 text-sm">
        <span>{number}</span>

        <AiFillStar color="orange" />
      </div>
      <div className="w-[75%]">
        <div className="w-full h-2 bg-gray-200 relative rounded-l-full rounded-r-full ">
          <div
            ref={percentRef}
            className="absolute inset-0 bg-gray-500 right-3 "
          ></div>
        </div>
      </div>
      <div className="w-[15%] text-xs text-400">{`${
        ratingCount || 0
      } reviewer(s)`}</div>
    </div>
  );
};

export default Votebar;
