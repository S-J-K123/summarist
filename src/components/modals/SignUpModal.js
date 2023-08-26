import { closeSignUpModal, openSignUpModal, toggleLoginModal, toggleSignUpModal } from "@component/redux/ModalSlice";
import { setUser } from "@component/redux/userSlice";
import { Modal } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function () {
  const isSignUpModal = useSelector((state) => state.modals.signUpModalOpen);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const auth = getAuth()

function hideLoginModal() {
  setEmail("");
  setPassword("");
  dispatch(toggleLoginModal());
  dispatch(toggleSignUpModal());
}



  async function handleSignUp() {
    const userCredientials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    dispatch(toggleSignUpModal())
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
if(!currentUser) return;
dispatch(
  setUser(
    {
      username: currentUser.email.split("@")[0],
      name: null,
      email: currentUser.email,
      uid: currentUser.uid,
      photoURL: null,
    }
  )
)
    })
    return unsubscribe
  })



  return (
    <div>
        <div onClick={hideLoginModal} className="text-[#116BE9] cursor-pointer flex justify-center mb-1 bg-[#F1F6F4] pb-2 mt-6 pt-2">
        Don't have an account?
      </div>
      <Modal
        className="flex justify-center items-center"
        open={isSignUpModal}
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

            <input onChange={e => setEmail(e.target.value)}
              placeholder="Email Address"
              className="h-10 rounded-md p-4 w-[80%] m-auto border border-black"
              type={"email"}
            />
            <input onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="h-10 rounded-md p-4 mt-5 w-[80%] m-auto border border-black"
              type={"password"}
            />
            <button onClick={handleSignUp} className="bg-[#2BD97C] text-white font-bold p-2 mt-8 w-[80%] m-auto">
              Sign up
            </button>

            <div className="bg-[#F1F6F4] flex justify-center mt-6 p-1.5">
              <div onClick={hideLoginModal}
                
                className="text-[#116BE9] flex justify-center mb-1 bg-[#F1F6F4] pb-2 cursor-pointer"
              >
                Already have an account?
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
