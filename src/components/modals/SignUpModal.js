import {
  closeSignUpModal,
  openSignUpModal,
  toggleLoginModal,
  toggleSignUpModal,
} from "@component/redux/ModalSlice";
import { setUser } from "@component/redux/userSlice";
import { Modal } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';
import { SpinnerCircularFixed } from "spinners-react";




export default function () {
  const isSignUpModal = useSelector((state) => state.modals.signUpModalOpen);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const router = useRouter();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);


  function hideLoginModal() {
    setEmail("");
    setPassword("");
    dispatch(toggleLoginModal());
    dispatch(toggleSignUpModal());
  }

  async function handleSignUp() {
    setButtonClicked(true);
    setLoading(true)
    const userCredientials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // router.push("/ForYou");

    dispatch(toggleSignUpModal());
    setLoading(false)
  }




  const handleHideSignUpModal = async () => {
    // setButtonClicked(true);
    // setLoading(true);
    // setIsSignUpOpen(false);

    try {
      // Perform signup operation
      await handleSignUp();
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle error if needed
    } finally {
    
      // Open the loginModal
      dispatch(toggleSignUpModal());
    }
  };
  
  

  //   const emailSignUp = async (e: any) => {
  //   try {
  //     e.preventDefault();
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     const user = auth.currentUser;
  //
  const handleCloseSignUpModal = () => {
    setIsSignUpOpen(false);
    setLoading(false); // Reset loading state when hiding the modal
    dispatch(toggleLoginModal()); // Open the loginModal
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(
        setUser({
          username: currentUser.email.split("@")[0],
          name: null,
          email: currentUser.email,
          uid: currentUser.uid,
          photoURL: null,
        })
      );
    });
    return unsubscribe;
  });

  return (
    <div>
      <div
        onClick={hideLoginModal}
        className="text-[#116BE9] cursor-pointer flex justify-center mb-1 bg-[#F1F6F4] pb-2 mt-6 pt-2"
      >
        Don't have an account?
      </div>
      <Modal
        className="flex justify-center items-center"
        open={isSignUpModal}
        onClose={() => dispatch(toggleSignUpModal())}
      >
   <div className="w-[70%] h-fit bg-white md:w-[560px] md:min-h-[450px] md:h-[600px] rounded-lg lg:w-[25%] lg:h-[54%] flex justify-center ml-10 relative">
  <div
    className="absolute top-4 right-4 cursor-pointer"
    onClick={handleHideSignUpModal}
  >
    <CloseIcon className="w-6" />
  </div>
  <div className="w-full mt-8 flex flex-col">
          <div onClick={handleHideSignUpModal}className="absolute top-4 right-4 cursor-pointer">


</div>
            <h1 className="text-black flex justify-center mb-3 font-bold text-lg">
              Sign up to Summarist
            </h1>

            <button className="bg-[#4285f4] text-white font-bold p-2 mt-3 w-[80%] m-auto">
              Sign up with Google
            </button>
            <h1 className="text-center mt-2 text-black text-lg mb-2">or</h1>

            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="h-10 rounded-md p-4 w-[80%] m-auto border border-black"
              type={"email"}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-10 rounded-md p-4 mt-5 w-[80%] m-auto border border-black"
              type={"password"}
            />

<button
  onClick={handleSignUp}
  className={`bg-[#2BD97C] text-white font-bold p-2 mt-8 w-[80%] h-[35px] m-auto relative ${
    loading ? 'loading-button' : ''
  }`}
>
  {buttonClicked && loading ? (
    <div className="absolute inset-0 flex items-center justify-center">
      <SpinnerCircularFixed size={30} thickness={150} speed={100} />
    </div>
  ) : (
    "Sign up"
  )}
</button>

          

            <div className="bg-[#F1F6F4] flex justify-center mt-6 p-1.5">
              <div
                onClick={hideLoginModal}
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
