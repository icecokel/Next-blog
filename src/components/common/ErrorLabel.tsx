import React from "react";

interface IErrorLabelProps {
  text: string;
  className?: string;
}

const ErrorLabel = ({ text, className }: IErrorLabelProps) => {
  return <div className={className ?? "error-text"}>{text}</div>;
};

export default ErrorLabel;
