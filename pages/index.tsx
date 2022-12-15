import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    window.location.replace(window.location.search + "/blog/solo");
  }, []);

  return <div></div>;
};

export default Home;
