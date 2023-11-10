import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import React, { useState } from "react";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Link from "next/link";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setIsUserAuth } from "@component/redux/userSlice";
import { toggleLoginModal } from "@component/redux/ModalSlice";
import LoginModal from "./modals/LoginModal";
import SignUpModal from "./modals/SignUpModal";
import ResetModal from "./modals/ResetModal";

export default function SideBar() {
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch();
  const isUserAuth = useSelector((state) => state.user.isUserAuth);
const user = auth.currentUser
const email = user
console.log(user)
  const logUserInOut = (event) => {
    event.preventDefault();
    if (user) {
      auth.signOut();
      dispatch(setIsUserAuth(false));
    } else {
      dispatch(toggleLoginModal());
   
    }
    console.log(auth.currentUser);
  };

  return (
    <div
      className={`${
        pathname.startsWith("/player/") ? " sidebar__bump-up" : "sidebar"
      } hidden sm:flex flex-col fixed bg-[#f7faf9] pr-6 z-[1] h-full`}
    >
      <div className="hidden">
        <LoginModal />
        <SignUpModal />
        <ResetModal />
      </div>
      <div>
        <img
          className="w-[100] h-[40px] ml-5 mt-5"
          src="../assets/summarist.webp"
        />
      </div>
      <nav className="space-y-5 pl-5 h-full">
        <div className="group__wrapper">
          <div className="top__4">
            <Link href="/ForYou">
              <SideBarLink Icon={HomeOutlinedIcon} text={"For you"} />
            </Link>

            <Link href={"/Library"}>
              <SideBarLink text={"My Library"} Icon={TurnedInNotOutlinedIcon} />
            </Link>

            <SideBarLink disabled text={"Highlights"} Icon={EditOutlinedIcon} />
            <SideBarLink disabled text={"Search"} Icon={SearchOutlinedIcon} />
          </div>

          <div className="space-y-5">
            <div className="bottom__3 pb-12">
              <Link href="/Settings">
                <SideBarLink
                  text={"Settings"}
                  Icon={SettingsSuggestOutlinedIcon}
                />
              </Link>

              <SideBarLink
                disabled
                text={"Help & Support"}
                Icon={HelpOutlineOutlinedIcon}
              />
              <SideBarLink
                text={user ? "Logout" : "Login"} // Change text based on authentication status
                Icon={LogoutOutlinedIcon}
                onClick={(e) => logUserInOut(e)}
                className="logout-btn"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

function SideBarLink({ text, Icon, disabled, onClick, className }) {
  const linkClass = disabled ? "disabled-link" : "";
  return (
    <li
      onClick={onClick} // Handle click event here
      className={`hoverAnimation mb-10 flex items-center text-[16px] list-none mt-14 ml-2 ${linkClass} ${className}`}
    >
      <Icon className="mr-4" />
      {text}
    </li>
  );
}