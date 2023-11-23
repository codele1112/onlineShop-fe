import React, { memo } from "react";

function Countdown({ unit, number }) {
  return (
    <div className="w-[30%] h-[60px] border flex justify-center items-center bg-gray-200 rounded-md flex-col">
      <span className="text-[18px] text-gray-800">{number}</span>
      <span className="text-xs text-gray-600">{unit}</span>
    </div>
  );
}

export default memo(Countdown);
