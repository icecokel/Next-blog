import React from "react";

interface IErrorLabelProps {
  text: string;
  className?: string;
}

const ErrorLabel = ({ text, className }: IErrorLabelProps) => {
  return (
    <span className={className ?? "error-text"}>
      <i className="material-icons">error</i>
      <span>{text}</span>
    </span>
  );
};

export default ErrorLabel;
