import image from "../assets/image.png"

const Header = () => {
  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20 font-mono">
      {/* Left Section */}
      <div>
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">Change your photo <br className="max:md-hidden"/> into an <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">Art</span></h1>
        <p className="my-6 text-[15px] text-gray-500">This AI turns your photos <br className="max:sm-hidden"/> into stunning creative formats with just one
        click!</p>
        <div>
            <input type="file" id="upload1" hidden />
            <label className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 m-auto hover:scale-105 transition-all duration-500 text-white" htmlFor="upload1">
                <p>Upload Photo 📷</p>
            </label>
        </div>
      </div>
      {/* Right Section */}
      <div>
        <img className="w-[550px] " src={image} alt="" />
      </div>
    </div>
  )
}

export default Header
