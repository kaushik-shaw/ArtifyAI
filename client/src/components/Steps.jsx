
const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 xl:py-14 font-mono">    
        <div className="flex items-start flex-wrap gap-4 justify-center">

            <div className="flex items-start gap- bg-white border border-orange-500 drop-shadow-md p-5 pb-7 rounded-3xl hover:scale-105 transition-all duration-500">
                <p> 📷 Upload a photo</p>
            </div>

            <div className="flex items-start gap-4 bg-white border border-orange-500 drop-shadow-md p-5 pb-7 rounded-3xl hover:scale-105 transition-all duration-500">
                <p> 🎨 Select Style</p>
            </div>

            <div className="flex items-start gap-4 bg-white border border-orange-500 drop-shadow-md p-5 pb-7 rounded-3xl hover:scale-105 transition-all duration-500">
                <p> 💬 Enter Prompt</p>
            </div>

            <div className="flex items-start gap-4 bg-white border border-orange-500 drop-shadow-md p-5 pb-7 rounded-3xl hover:scale-105 transition-all duration-500">
                <p> ⬇️ Download Image</p>
            </div>

        </div>
    </div>
  )
}

export default Steps
