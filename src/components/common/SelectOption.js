import React from "react";

const SelectOption = ({ icon }) => {
  return (
    <div className="w-8 h-8 bg-white rounded-full border shadow-md flex items-center justify-center  hover:bg-gray-800  hover:border-gray-800 hover:text-white cursor-pointer">
      {icon}
    </div>
  );
};

export default SelectOption;
