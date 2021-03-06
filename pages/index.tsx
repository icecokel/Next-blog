import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  const handleClickSignUp = () => {
    alert("Sorry, but the service is being prepared.");
  };
  return (
    <div className="entry-page-wrap">
      <h1>Welcome Eucalyptus </h1>
      <div>
        Sign up and make your own blog.
        <div>
          <button onClick={handleClickSignUp}>Sign Up</button>
        </div>
      </div>

      <div>
        <p>Go to Popular Blog.</p>
        <ul>
          <Link href={"/blog/testUser"}>
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
