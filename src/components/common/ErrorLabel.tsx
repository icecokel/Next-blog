import React from "react";
import styles from "../../../styles/error.module.scss";

interface IErrorLabelProps {
  text: string;
  className?: string;
}

const ErrorLabel = ({ text, className }: IErrorLabelProps) => {
  return (
    <span className={className ?? styles.errorLabel}>
      <i className="material-icons">error</i>
      <span>{text}</span>
    </span>
  );
};

export default ErrorLabel;
