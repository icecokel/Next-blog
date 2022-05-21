import React from "react";

interface IBaseInputProps {
  type: "text" | "password" | "email";
  value: string;
  onChangeValue: any;
  className?: string;
  placeholder?: string;
  id?: string;
  name?: string;
}

const BaseInput = ({
  type = "text",
  value,
  onChangeValue,
  className,
  placeholder,
  name,
  id,
}: IBaseInputProps) => {
  return (
    <span>
      <input
        type={type}
        className={className}
        value={value}
        onChange={onChangeValue}
        placeholder={placeholder}
        name={name}
        id={id}
      />
    </span>
  );
};

export default BaseInput;
