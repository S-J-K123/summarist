import SearchIcon from "@mui/icons-material/Search";
import SideBar from "@component/components/SideBar";
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

const SettingsLogin = () => {
    const isSignUpModal = useSelector((state) => state.modals.signUpModalOpen);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const auth = getAuth();
    const router = useRouter();
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);


    function hideLoginModal() {
        setEmail("");
        setPassword("");
        dispatch(toggleLoginModal());
        dispatch(toggleSignUpModal());
      }


      const handleHideSignUpModal = () => {
        setIsSignUpOpen(false);
        // Open the loginModal
        dispatch(toggleSignUpModal())
        
      };

      const handleCloseSignUpModal = () => {
        setIsSignUpOpen(false);
        dispatch(toggleLoginModal()); // Open the loginModal
      };

    //   async function handleSignUp() {
    //     const userCredientials = await createUserWithEmailAndPassword(
    //       auth,
    //       email,
    //       password
    //     );
    //     router.push("/ForYou");
    
    //     dispatch(toggleSignUpModal());
    //   }


  return (
    <div>
      <SideBar />
      <div className="wrapper">
        {/* <div className='search__background'>
            <div className='search__wrapper'>
            <figure className=''></figure>
            </div>
            </div> */}
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                className="search__input"
                placeholder="Search for books"
                type="text"
              />
              <div className="search__icon">
                <SearchIcon className="svg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings__container">
        <div className="settings-row">
          <div className="settings-title">Settings</div>
          <div className="settings__login--wrapper">
            <img
              className="settings__img"
              src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogin.e313e580.png&w=1080&q=75"
            />
            <div className="settings__login--text">
              Log in to your account to see your details.
            </div>
            <button onClick={handleCloseSignUpModal} className="btn">Login</button>
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLogin;
