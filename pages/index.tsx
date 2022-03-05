import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="main-page">
      <h1>Welcome Eucalyptus </h1>
      <div>
        Sign up and make your own blog.
        <div>
          <button>Sign Up</button>
        </div>
      </div>
      <div>
        Popular Blog.
        <ul>
          <Link href={"/testAdmin"}>
            <a>
              <li>Test Admin</li>
            </a>
          </Link>
          <Link href={"/testAdmin"}>
            <a>
              <li>Test Admin</li>
            </a>
          </Link>
          <Link href={"/testAdmin"}>
            <a>
              <li>Test Admin</li>
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Home;
