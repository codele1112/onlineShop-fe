import React, { memo } from "react";
import clsx from "clsx";

const Select = ({
  label,
  options = [],
  register,
  errors,
  id,
  validate,
  style,
  fullWidth,
  defaultValue,
}) => {
  return (
    <div className={clsx("flex flex-col gap-2", style)}>
      {label && <label htmlFor={id}>{label}</label>}
      {
        <select
          defaultValue={defaultValue}
          className={clsx("form-select border", fullWidth && "w-full")}
          id={id}
          {...register(id, validate)}
        >
          <option value="">---Choose---</option>
          {options.map((el, index) => (
            <option key={index} value={el.code}>
              {el.value}
            </option>
          ))}
        </select>
      }
      {errors[id] && (
        <small className=" text-red-500 text-xs">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(Select);
