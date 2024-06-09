import React from "react";
import { useParams } from "react-router-dom";
import UserSideBar from "../UserProfile/UserSideBar.js";
import AccountSettings from "../UserProfile/AccountSettings.js";
import "../../styles/UserProfile.css";
import HeaderComponent from "../HeaderComponent.js";
import FooterComponent from "../FooterComponent.js";
import ChangePassword from "../UserProfile/ChangePassword.js";
import ChangeNickname from "./ChangeNickname.js";

const UserProfile = () => {
  const { activepage } = useParams();

  // alert(activepage)
  return (
    <>
      <HeaderComponent />
      <div className="userprofile">
        {/* UserProfile , showing {activepage}
         */}

        <div className="userprofilein">
          <div className="left">
            <UserSideBar activepage={activepage} />
          </div>
          <div className="right">
            {activepage === "accountsettings" && <AccountSettings />}
            {activepage === "password" && <ChangePassword />}
            {activepage === "changenickname" && <ChangeNickname />}
            
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default UserProfile;
