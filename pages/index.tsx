import { useEffect } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  useEffect(() => {
    window.location.replace(window.location.search + "/blog/leemon");
  }, []);

  return <div></div>;
};

export default Home;
