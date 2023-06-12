import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { ReactNode, createContext, useEffect, useState } from "react";

interface ICircleEffect {
  setShowing: (isOpen: boolean) => void;
}

const circleEffect: ICircleEffect = {
  setShowing: (isOpen: boolean) => {},
};

export const getCircleEffect = () => circleEffect;

interface ILoaderProps {
  open: () => void;
  close: () => void;
}

export const LoaderContext = createContext<ILoaderProps>({} as ILoaderProps);

const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const circleEffect = getCircleEffect();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  circleEffect.setShowing = (target: boolean) => {
    setIsOpen(target);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const onChangePageStart = () => {
      setIsOpen(true);
    };
    const onChangeComplete = () => {
      setIsOpen(false);
    };

    router.events.on("routeChangeStart", onChangePageStart);
    router.events.on("routeChangeComplete", onChangeComplete);
    return () => {
      router.events.off("routeChangeStart", onChangePageStart);
      router.events.off("routeChangeComplete", onChangeComplete);
    };
  }, [router]);
  return (
    <LoaderContext.Provider value={{ open, close }}>
      {children}

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
