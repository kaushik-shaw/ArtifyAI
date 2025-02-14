import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import logo from "../assets/svg.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

  return (
    <>
      <div className="flex items-center justify-between mx-4 py-3 lg:mx-44 font-mono">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img className="w-10" src={logo} alt="" />
            <div className="text-2xl">ArtifyAI</div>
          </div>
        </Link>
        {isSignedIn ? (
          <div>
            <UserButton/>
          </div>
        ) : (
          <button
            onClick={() => openSignIn({})}
            className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full"
          >
            Get Started 👉
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
