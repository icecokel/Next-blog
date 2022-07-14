import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import "react-quill/dist/quill.snow.css";
import { wrapper } from "../store";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React from "react";
import ErrorModal from "../src/components/common/ErrorModal";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Header />
        <div className="main-wrap">
          <Component {...pageProps} />
        </div>
        <Footer />
      </Hydrate>
      <ErrorModal />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(MyApp);
