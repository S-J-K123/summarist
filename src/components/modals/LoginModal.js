import { useDispatch, useSelector } from "react-redux";
import ResetModal from "./ResetModal";
import SignUpModal from "./SignUpModal";
import { Modal } from "@mui/material";
import { SpinnerCircularFixed } from "spinners-react";
import {
  browserLocalPersistence,
  signInWithEmailAndPassword,
  setPersistence,
} from "firebase/auth";
import { toggleLoginModal } from "@component/redux/ModalSlice";
import { setIsUserAuth } from "@component/redux/userSlice";
import { useState } from "react";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { auth } from "../../../firebase";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // Manage loading state independently for each button
  const [loadingGuest, setLoadingGuest] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [buttonClicked, setButtonClicked] = useState(false);

  const isLoginUpModal = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  function hideLoginModal() {
    setEmail("");
    setPassword("");
    dispatch(toggleLoginModal());
    dispatch(toggleSignUpModal());
  }

  async function handleSignIn() {
    setButtonClicked(true);
    setLoadingLogin(true); // Set loading state for the login button
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(toggleLoginModal());
      dispatch(setIsUserAuth(true));
    } catch (error) {
      alert(error);
    } finally {
      setLoadingLogin(false);
    }
  }

  async function guestLogIn() {
    setButtonClicked(true);
    setLoadingGuest(true); // Set loading state for the guest login button
    try {
      await setPersistence(auth, browserLocalPersistence);
      const email = "guest@gmail.com";
      const password = "password";
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error);
    } finally {
      setLoadingGuest(false);
      dispatch(setIsUserAuth(true));
      dispatch(toggleLoginModal());
      console.log(auth.currentUser);
    }
  }

  const handleOpenSignUpModal = () => {
    setIsSignUpOpen(true);
    dispatch(toggleLoginModal());
  };

  return (
    <div>
      <div onClick={hideLoginModal} className="text-[#116BE9]">
        login
      </div>
      <Modal
        open={isLoginUpModal}
        onClose={() => dispatch(toggleLoginModal())}
        is
        className="flex justify-center items-center"
      >
        <div className="relative w-[70%] h-fit bg-white md:w-[560px] md:h-[600px] md:min-h-[540px] rounded-lg lg:w-[25%] lg:h-[75%] flex justify-center ml-10">
          <div className="w-full mt-8 flex flex-col">
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: "999",
              }}
            >
              <div onClick={handleOpenSignUpModal} className="absolute top-4 right-4 cursor-pointer">
                <CloseIcon className="w-6" />
              </div>
            </div>
            <h1 className="text-black flex justify-center mb-6 font-bold text-lg relative">
              Login to Summarist
            </h1>
            <button
              onClick={guestLogIn}
              className={`bg-[#3A579D] text-white font-bold p-2 ${
                loadingGuest ? 'h-[35px] w-[80%]' : 'w-[80%]'
              } m-auto relative`}
            >
              {buttonClicked && loadingGuest ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <SpinnerCircularFixed size={30} thickness={150} speed={100} />
                </div>
              ) : (
                "Login as a Guest"
              )}
            </button>
            <h1 className="text-center mt-2 text-black text-lg">or</h1>
            <button
              className="bg-[#4285f4] text-white font-bold p-2 mt-3 w-[80%] m-auto cursor-not-allowed"
              onClick={() => alert("Login with Google clicked")}
            >
              Login with Google
            </button>
            <h1 className="text-center mt-2 text-black text-lg mb-2">or</h1>
            <input
              placeholder="Email Address"
              className="h-10 rounded-md p-4 w-[80%] m-auto border border-black"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="h-10 rounded-md p-4 mt-7 w-[80%] m-auto border border-black"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSignIn}
              className={`bg-[#2BD97C] text-white font-bold p-2 mt-4 ${
                loadingLogin ? 'h-[35px] w-[80%]' : 'w-[80%]'
              } m-auto relative`}
            >
              {buttonClicked && loadingLogin ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <SpinnerCircularFixed size={30} thickness={150} speed={100} />
                </div>
              ) : (
                "Login"
              )}
            </button>
            <ResetModal />
            <SignUpModal />
          </div>
        </div>
      </Modal>
    </div>
  );
}
