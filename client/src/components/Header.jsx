import { useContext } from "react";
import image from "../assets/image.png";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { handleSourceImage, handleTargetImage, handlePrompt, prompt, sourceImageName, targetImageName } =
    useContext(AppContext);

  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20 font-mono">
      {/* Left Section */}
      <div>
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
          Change your photo <br className="max:md-hidden" /> into an{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
            Art
          </span>
        </h1>
        <p className="my-6 text-[15px] text-gray-500">
          This AI turns your photos <br className="max:sm-hidden" /> into
          stunning creative formats with just one click!
        </p>

        <div className="py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <input type="file" id="upload1" onChange={(e) => handleSourceImage(e.target.files[0])} hidden />
            <label
              className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 m-auto hover:scale-105 transition-all duration-500 text-white"
              htmlFor="upload1"
            >
              <p>{sourceImageName || "Upload Photo 📷"}</p>
            </label>
          </div>
          <p className="text-gray-500 text-sm flex-1">
            An image of a person to be converted
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 ">
          <div className="flex items-center gap-4">
            <input type="file" id="upload2" onChange={(e) => handleTargetImage(e.target.files[0])} hidden />
            <label
              className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 m-auto hover:scale-105 transition-all duration-500 text-white"
              htmlFor="upload2"
            >
              <p>{targetImageName || "Upload Photo 📷"}</p>
            </label>
          </div>
          <p className="text-gray-500 text-sm flex-1">
            Any image to convert the person to
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter your prompt here..."
              value={prompt}
              className="w-full px-6 py-3.5 rounded-full border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              onChange={(e) => handlePrompt(e.target.value)}
            />
          </div>
          <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white hover:scale-105 transition-all duration-500">
            Generate ✨
          </button>
        </div>
      </div>
      {/* Right Section */}
      <div>
        <img className="w-[550px] " src={image} alt="" />
      </div>
    </div>
  );
};

export default Header;
