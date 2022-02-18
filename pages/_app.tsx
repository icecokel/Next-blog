import type { AppProps } from "next/app";
import "../styles/globals.scss";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
