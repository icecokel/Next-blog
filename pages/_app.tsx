import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import "react-quill/dist/quill.snow.css";
import { wrapper } from "../store";
import NavBar from "../src/components/layout/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <div className="main-wrap">
        <Component {...pageProps} />
      </div>
      <NavBar />
      <Footer />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
