import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    window.location.replace(window.location.search + "/blog/leemon");
  }, []);

  return <div></div>;
};

export default Home;
