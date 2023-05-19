import { ReactNode } from "react";
import styles from "./SlideEffect.module.scss";

interface ISladeEffectProps {
  type: "slideIn" | "slideUp";
  duration?: number;
  children: ReactNode;
}

const SlideEffect = ({ children, duration = 1000, type }: ISladeEffectProps) => {
  return (
    <div className={styles[type]} style={{ animationDuration: `${duration}` }}>
      {children}
    </div>
  );
};

export default SlideEffect;
