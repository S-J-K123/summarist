import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import React from "react";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function SideBar() {
  return (
    <div className=" hidden sm:flex flex-col fixed bg-[#f7faf9] pr-6 h-full">
      <div>
        <img className="w-[100] h-[40px] ml-5 mt-5" src="../assets/summarist.webp" />
      </div>
      <nav className="space-y-5">
        <SideBarLink Icon={HomeOutlinedIcon} text={"For you"} />
        <SideBarLink text={"My Library"} Icon={TurnedInNotOutlinedIcon} />
        <SideBarLink text={"Highlights"} Icon={EditOutlinedIcon}/>
        <SideBarLink text={"Search"} Icon={SearchOutlinedIcon} />
        <div className="pt-[84px] space-y-5">
        <SideBarLink text={"Settings"} Icon={SettingsSuggestOutlinedIcon} />
        <SideBarLink text={"Help & Support"} Icon={HelpOutlineOutlinedIcon} />
        <SideBarLink text={"Logout"} Icon={LogoutOutlinedIcon} />
        </div>
      
      </nav>
    </div>
  );
}

function SideBarLink({ text, Icon }) {
  return (
    <li className="hoverAnimation mb-2.5 flex items-center text-[16px] list-none mt-14 ml-2">
        <Icon className="mr-4"/>
        {text}
   
    </li>
  );
}
