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
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Hydrate state={pageProps.dehydratedState}>
          <Header />
          <div className="main-wrap">
            <Component {...pageProps} />
          </div>
          <Footer />
        </Hydrate>
        <ErrorModal />
      </SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(MyApp);
