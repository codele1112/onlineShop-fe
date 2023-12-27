import React, { memo } from "react";

const InputSelect = ({ value, changValue, options }) => {
  return (
    <select
      className="form-select text-sm text-gray-500"
      value={value}
      onChange={(e) => changValue(e.target.value)}
    >
      <option>Choose</option>
      {options?.map((el) => (
        <option key={el.id} value={el.value}>
          {el.text}
        </option>
      ))}
    </select>
  );
};

export default memo(InputSelect);
