export default function LoginModal() {
  return (
    <div>
      <div
        className="w-[70%] h-fit bg-black md:w-[560px] md:h-[600px] rounded-lg lg:w-[25%] lg:h-[65%]
            flex justify-center ml-10 mt-7"
      >
        <div className="w-[90%] mt-8 flex flex-col">
          <h1 className="text-white flex justify-center mb-8 font-bold text-lg">
            Login to Summarist
          </h1>
          <button className="bg-[#3A579D] text-white w-full font-bold p-2">
            Login as a Guest
          </button>
          <h1 className="text-center font-bold mt-3 text-white text-lg">or</h1>
          <button className="bg-[#4285f4] text-white w-full font-bold p-2 mt-7">
            Login with Google
          </button>
          <h1 className="text-center font-bold mt-3 text-white text-lg">or</h1>s
          <input
            placeholder="Email Address"
            className="h-10 rounded-md p-4"
            type={"email"}
          />
          <input
            placeholder="Password"
            className="h-10 rounded-md p-4 mt-7"
            type={"password"}
          />
          <button className="bg-[#2BD97C] text-white w-full font-bold p-2 mt-8">
            Login
          </button>
          <p className="text-[#116BE9] flex justify-center mt-9">
            Forgot your password?
          </p>
          <div className="bg-[#F1F6F4] flex justify-center mt-6 p-1.5">
            <button className="text-[#116BE9] flex justify-center mb-1 w-full">
              Don't have an account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
