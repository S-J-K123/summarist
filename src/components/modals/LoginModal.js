export default function LoginModal() {
    return (
      <div>
        <div
          className="w-[70%] h-fit bg-white md:w-[560px] md:h-[600px] rounded-lg lg:w-[25%] lg:h-[75%]
              flex justify-center ml-10 "
        >
          <div className="w-full mt-8 flex flex-col">
            <h1 className="text-black flex justify-center mb-6 font-bold text-lg">
              Login to Summarist
            </h1>
            <button className="bg-[#3A579D] text-white font-bold p-2 w-[80%] m-auto">
              Login as a Guest
            </button>
            <h1 className="text-center mt-2 text-black text-lg">or</h1>
            <button className="bg-[#4285f4] text-white font-bold p-2 mt-3 w-[80%] m-auto">
              Login with Google
            </button>
            <h1 className="text-center mt-2 text-black text-lg mb-2">or</h1>
  
            <input
              placeholder="Email Address"
              className="h-10 rounded-md p-4 w-[80%] m-auto border border-black"
              type={"email"}
            />
            <input
              placeholder="Password"
              className="h-10 rounded-md p-4 mt-7 w-[80%] m-auto border border-black"
              type={"password"}
            />
            <button className="bg-[#2BD97C] text-white font-bold p-2 mt-8 w-[80%] m-auto">
              Login
            </button>
            <p className="text-[#116BE9] flex justify-center mt-6">
              Forgot your password?
            </p>
  
            <div className="bg-[#F1F6F4] flex justify-center mt-6 p-1.5">
              <p
                className="text-[#116BE9] flex justify-center mb-1 bg-[#F1F6F4] pb-2"
              >
                Don't have an account?
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  