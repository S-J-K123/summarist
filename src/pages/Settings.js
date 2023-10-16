import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SideBar from "@component/components/SideBar";

const Settings = () => {
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
        <div className="setting__content">
          <div className="settings__sub--title">Your Subscription plan</div>
          <div className="setting__text">premium</div>
        </div>
        <div className="settings__content">
          <div className="settings__sub--title">Email</div>
          <div className="setting__text">Hanna@gmail.com</div>
        </div>
      </div>
</div>
  
    </div>
  );
};

export default Settings;
