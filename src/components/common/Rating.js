import React, { memo } from "react";
import { renderStarFromNumber } from "../../ultils/helpers";

const Rating = ({ totalRatings, totalCount }) => {
  return (
    <div>
      <span className="font-semibold text-3xl">{`${totalRatings}/5 `}</span>
      <span className="flex items-center gap-1">
        {renderStarFromNumber(totalRatings)?.map((el, index) => (
          <span key={index}>{el}</span>
        ))}
      </span>
      <span className="text-sm">{`${totalCount} reviewer(s)`}</span>
    </div>
  );
};

export default memo(Rating);
