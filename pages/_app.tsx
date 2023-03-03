import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import { wrapper } from "../store";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React from "react";
import ErrorModal from "../src/components/common/ErrorModal";
import CommonModal from "../src/components/common/CommonModal";
import { SessionProvider } from "next-auth/react";
import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Hydrate state={pageProps.dehydratedState}>
          <Header />
          <div className={styles.mainWrap}>
            <Component {...pageProps} />
          </div>
          <Footer />
        </Hydrate>
        <ErrorModal />
        <CommonModal />
      </SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(MyApp);
