import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import "../../styles/managecommunity.css";
import HeaderComponent from '../HeaderComponent.js';
import FooterComponent from '../FooterComponent.js';
import CommunitySideBar from './CommunitySideBar.js';
import KickUserComponent from './KickUserComponent.js';
import TransferOwnershipComponent from './TransferOwnershipComponent.js';
import AsssignCommunityRolesComponent from './AsssignCommunityRolesComponent.js';
import InviteUsersComponent from './InviteUsersComponent.js';

const ManageCommunity = () => {
  const { activepage } = useParams();
  return (
    <>
     <HeaderComponent />
      <div className="communityprofile">
        {/* UserProfile , showing {activepage}
         */}

        <div className="communityprofilein">
          <div className="left">
          <CommunitySideBar activepage={activepage} />
          </div>
          <div className="right">
          {activepage === "kickuser" && <KickUserComponent />}
          {activepage === "transferownership" && <TransferOwnershipComponent />}
          {activepage === "roles" && <AsssignCommunityRolesComponent />}
          {activepage === "invite" && <InviteUsersComponent />}
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  )
}

export default ManageCommunity