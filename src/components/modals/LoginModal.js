import { useDispatch, useSelector } from "react-redux";
import ResetModal from "./ResetModal";
import SignUpModal from "./SignUpModal";
import { Modal } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { toggleLoginModal } from "@component/redux/ModalSlice";
import { useEffect, useState } from "react";
import { setUser } from "@component/redux/userSlice";





export default function LoginModal() {
  const auth = getAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const isLoginUpModal = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch()

function hideLoginModal() {
  setEmail("");
  setPassword("");
  dispatch(toggleLoginModal());
  dispatch(toggleSignUpModal());
}



async function handleLogin() {
  const userCredientials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  dispatch(toggleLoginModal())
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
         <div onClick={hideLoginModal} className="text-[#116BE9]">
       login
      </div>
        <Modal
        open={isLoginUpModal}
        onClose={() => dispatch(toggleLoginModal())}
        is
        className="flex justify-center items-center">
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
            <button onClick={handleLogin} className="bg-[#2BD97C] text-white font-bold p-2 mt-8 w-[80%] m-auto">
              Login
            </button>
      <ResetModal/>
      <SignUpModal/>
          </div>
        </div>
        </Modal>
   
      </div>
    );
  }
  