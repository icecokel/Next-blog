import React from "react";
import styles from "./Error.module.scss";

interface IErrorLabelProps {
  text: string;
  className?: string;
}

const ErrorLabel = ({ text, className }: IErrorLabelProps) => {
  return (
    <span className={className ?? styles.errorLabel}>
      <span className="material-icons">error</span>
      <span>{text}</span>
    </span>
  );
};

export default ErrorLabel;
