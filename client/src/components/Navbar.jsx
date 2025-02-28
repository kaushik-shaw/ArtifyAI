import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import logo from "../assets/svg.svg";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect } from "react";
import coin from "../assets/coin.svg"


const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext)

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData()
    }
  
    return () => {
      
    }
  }, [isSignedIn])
  

  return (
    <>
      <div className="flex items-center justify-between mx-4 py-3 lg:mx-44 font-mono">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img className="w-9 h-9" src={logo} alt="" />
            <div className="text-2xl">ArtifyAI</div>
          </div>
        </Link>
        {isSignedIn ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={()=>navigate('/buy')} className="flex text-white items-center gap-2 bg-black shadow-xl px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full">
              <img className="w-8 h-8" src={coin} alt="" />
              <p>Credits: {credit}</p>
            </button>
            <p className="text-gray-600 max-sm:hidden">Hi, {user.fullName}</p>
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
