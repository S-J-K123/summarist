import { closeSignUpModal, openSignUpModal, toggleSignUpModal } from "@component/redux/ModalSlice";
import { Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function () {
  const isOpen = useSelector((state) => state.modals.signUpModalOpen);
  const dispatch = useDispatch();
  console.log(isOpen);

  return (
    <div>
        <div onClick={() => dispatch(toggleSignUpModal())} className="text-[#116BE9]">
        Don't have an account?
      </div>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(toggleSignUpModal())}
      >
        <div
          className="w-[70%] h-fit bg-white md:w-[560px] md:h-[600px] rounded-lg lg:w-[25%] lg:h-[54%]
            flex justify-center ml-10 "
        >
          <div className="w-full mt-8 flex flex-col">
            <h1 className="text-black flex justify-center mb-3 font-bold text-lg">
              Sign up to Summarist
            </h1>

            <button className="bg-[#4285f4] text-white font-bold p-2 mt-3 w-[80%] m-auto">
              Sign up with Google
            </button>
            <h1 className="text-center mt-2 text-black text-lg mb-2">or</h1>

            <input
              placeholder="Email Address"
              className="h-10 rounded-md p-4 w-[80%] m-auto border border-black"
              type={"email"}
            />
            <input
              placeholder="Password"
              className="h-10 rounded-md p-4 mt-5 w-[80%] m-auto border border-black"
              type={"password"}
            />
            <button className="bg-[#2BD97C] text-white font-bold p-2 mt-8 w-[80%] m-auto">
              Sign up
            </button>

            <div className="bg-[#F1F6F4] flex justify-center mt-6 p-1.5">
              <p
                
                className="text-[#116BE9] flex justify-center mb-1 bg-[#F1F6F4] pb-2 cursor-pointer"
              >
                Already have an account?
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
