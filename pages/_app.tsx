import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import BaseModalProvider from "../src/components/common/BaseModal/BaseModalProvider";
import Footer from "../src/components/layout/Footer";
import Header from "../src/components/layout/Header";
import { wrapper } from "../store";
import styles from "../styles/app.module.scss";
import "../styles/globals.scss";
import { useEffect, useState } from "react";
import { getCircleEffect } from "../src/common/service/CircleEffect";
import { useRouter } from "next/router";

const CircleEffect = dynamic(import("../src/components/common/CircleEffect"), { ssr: false });

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const circleEffect = getCircleEffect();
  const router = useRouter();
  const [isOpenCircleEffet, setIsOpenCircleEffet] = useState<boolean>(circleEffect.isShowing);
  circleEffect.toggle = (isOpen: boolean) => {
    setIsOpenCircleEffet(isOpen);
  };

  useEffect(() => {
    const onChangePage = () => {
      setIsOpenCircleEffet(true);
    };

    router.events.on("routeChangeStart", onChangePage);

    return () => {
      router.events.off("routeChangeStart", onChangePage);
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      <BaseModalProvider>
        <>
          <Header />
          <div className={styles.mainWrap}>
            <Component {...pageProps} />
          </div>
          <Footer />
          <CircleEffect isOpen={isOpenCircleEffet} />
        </>
      </BaseModalProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
