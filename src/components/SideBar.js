import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import React from "react";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Link from "next/link";
import { auth } from "../../firebase";
import { useRouter } from "next/router";

export default function SideBar() {
  const router = useRouter();
  const { id, pathname } = router.query;
  const logUserOut = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    auth.signOut();
    // window.location.reload(); // Commenting this out since it's not necessary
  };

  // className={`sidebar__wrapper ${
  //   pathname && pathname.startsWith("/player")
  //     ? "sidebar__bump-up"
  //     : ""
  // }`}

  return (
    // <div className="sidebar hidden sm:flex flex-col fixed bg-[#f7faf9] pr-6 z-[1]">
    <div   className={`sidebar__wrapper ${
      pathname && pathname.startsWith("/player")
        ? "sidebar__bump-up"
        : ""
    }`}>
      <div>
        <img
          className="w-[100] h-[40px] ml-5 mt-5"
          src="../assets/summarist.webp"
        />
      </div>
      <nav className="space-y-5 pl-5">
        <div className="group__wrapper">
              <div className="top__4">
                 <Link href="/ForYou">
          <SideBarLink Icon={HomeOutlinedIcon} text={"For you"} />
        </Link>

        <SideBarLink text={"My Library"} Icon={TurnedInNotOutlinedIcon} />
        <SideBarLink disabled text={"Highlights"} Icon={EditOutlinedIcon} />
        <SideBarLink disabled text={"Search"} Icon={SearchOutlinedIcon} />
        </div>
 


        <div className="space-y-5">
          <div className="bottom__3">
                   <Link href="/Settings">
            <SideBarLink text={"Settings"} Icon={SettingsSuggestOutlinedIcon} />
          </Link>

          <SideBarLink
            disabled
            text={"Help & Support"}
            Icon={HelpOutlineOutlinedIcon}
          />
          <SideBarLink
            text={"Logout"}
            Icon={LogoutOutlinedIcon}
            onClick={(e) => logUserOut(e)}
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
      className={`hoverAnimation mb-2.5 flex items-center text-[16px] list-none mt-14 ml-2 ${linkClass} ${className}`}
    >
      <Icon className="mr-4" />
      {text}
    </li>
  );
}
