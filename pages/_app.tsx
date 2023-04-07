import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import { wrapper } from "../store";
import React from "react";
import ErrorModal from "../src/components/common/ErrorModal";
import CommonModal from "../src/components/common/CommonModal";
import { SessionProvider } from "next-auth/react";
import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <div className={styles.mainWrap}>
        <Component {...pageProps} />
      </div>
      <Footer />
      <ErrorModal />
      <CommonModal />
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
