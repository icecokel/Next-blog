import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import BaseModalProvider from "../src/components/common/BaseModal/BaseModalProvider";
import LoaderProvider from "../src/components/common/Loader/LoaderProvider";
import Footer from "../src/components/layout/Footer";
import Header from "../src/components/layout/Header";
import { wrapper } from "../store";
import styles from "../styles/app.module.scss";
import "../styles/globals.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <BaseModalProvider>
        <LoaderProvider>
          <>
            <Header />
            <div className={styles.mainWrap}>
              <Component {...pageProps} />
            </div>
            <Footer />
          </>
        </LoaderProvider>
      </BaseModalProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
