import { closeResetModal, openResetModal, toggleLoginModal, toggleResetModal, toggleSignUpModal } from "@component/redux/ModalSlice";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function ResetModal() {
  const [email, setEmail] = useState("")
  const isResetModal = useSelector((state) => state.modals.resetModalOpen);
  const dispatch = useDispatch();



  function hideLoginModal() {
    setEmail("");
    dispatch(toggleLoginModal());
    dispatch(toggleResetModal());
  }

  function hideResetModal() {
    dispatch(toggleLoginModal());
    dispatch(toggleResetModal());
  }


  return (
    <div>
      <div
        onClick={hideLoginModal}
        className="text-[#116BE9] cursor-pointer flex justify-center mt-6 "
      >
        Reset your password
      </div>
      <Modal
        className="flex justify-center items-center"
        open={isResetModal}
        onClose={() => dispatch(toggleResetModal())}
      >
        <div
          className="w-[70%] h-fit bg-white md:w-[560px] md:h-[600px] rounded-lg lg:w-[25%] lg:h-[35%]
            flex justify-center ml-10 "
        >
          <div className="w-full mt-8 flex flex-col">
            <h1 className="text-black flex justify-center mb-5 font-bold text-lg">
              Reset your password
            </h1>

            <input
              placeholder="Email Address"
              className="h-10 rounded-md p-4 w-[80%] m-auto border border-black"
              type={"email"}
            />
            <button className="bg-[#2BD97C] text-black p-2 w-[80%] m-auto">
              Send reset password link
            </button>

            <div className="bg-[#F1F6F4] flex justify-center mt-5 p-1.5">
              <div onClick={hideResetModal} className="text-[#116BE9] flex justify-center bg-[#F1F6F4] pb-1 cursor-pointer">
                Go to login
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
