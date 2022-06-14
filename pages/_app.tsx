import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import "react-quill/dist/quill.snow.css";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <div className="main-wrap">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
