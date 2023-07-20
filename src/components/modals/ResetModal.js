import { closeResetModal, openResetModal } from "@component/redux/ModalSlice";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function ResetModal() {
  const isOpen = useSelector((state) => state.modals.ResetModalOpen);
  const dispatch = useDispatch();
  console.log(isOpen);
  return (
    <div>
      <div
        onClick={() => dispatch(openResetModal())}
        className="text-[#116BE9] cursor-pointer"
      >
        Reset your password
      </div>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeResetModal())}
      >
        <div
          className="w-[70%] h-fit bg-white md:w-[560px] md:h-[600px] rounded-lg lg:w-[25%] lg:h-[75%]
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
            <button className="bg-[#2BD97C] text-black font-bold p-2 mt-4 w-[80%] m-auto">
              Send reset password link
            </button>

            <div className="bg-[#F1F6F4] flex justify-center mt-5 p-1.5">
              <p className="text-[#116BE9] flex justify-center bg-[#F1F6F4] pb-1 cursor-pointer">
                Go to login
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
