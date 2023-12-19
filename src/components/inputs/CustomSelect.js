import clsx from "clsx";
import React from "react";
import Select from "react-select";

const CustomSelect = ({
  label,
  placeholder,
  onChange,
  option = [],
  value,
  className,
  wrapClassName,
}) => {
  return (
    <div className={clsx(wrapClassName)}>
      {label && <h3 className="font-medium">{label}</h3>}
      <Select
        placeholder={placeholder}
        isClearable
        isSearchable
        options={option}
        value={value}
        onChange={(value) => onChange(value)}
        formatOptionLabel={(option) => (
          <div className="flex items-center text-black gap-2">
            <span>{option.label}</span>
          </div>
        )}
        className={{ control: () => clsx("border-2 py-2", className) }}
      />
    </div>
  );
};

export default CustomSelect;
