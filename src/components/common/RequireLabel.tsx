import styles from "./RequireLabel.module.scss";

interface IRequireProps {
  isShowing?: boolean;
}

const RequireLabel = ({ isShowing = true }: IRequireProps) => {
  return <div className={isShowing ? styles.requireLabel : ""}></div>;
};

export default RequireLabel;
