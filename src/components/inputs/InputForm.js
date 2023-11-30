import React, { memo } from "react";
import clsx from "clsx";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
  style,
}) => {
  return (
    <div className={clsx("flex flex-col h-[78px] gap-2", style)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx("form-input border my-auto p-2", fullWidth && "w-full")}
        defaultValue={defaultValue}
      />
      {errors[id] && (
        <small className=" text-red-500 text-xs">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
