import { useContext } from "react";
import { LoaderContext } from "./LoaderProvider";

const useLoader = () => {
  const { open, close } = useContext(LoaderContext);

  return {
    open,
    close,
  };
};

export default useLoader;
