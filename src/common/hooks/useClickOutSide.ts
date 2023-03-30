import { useEffect, useRef } from "react";

const useClickOutSide = (onClickOutSide: () => void) => {
  const ref = useRef<HTMLElement>(null);
  const handleClickOutSide = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClickOutSide();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutSide);
    return () => {
      window.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return ref;
};

export default useClickOutSide;
