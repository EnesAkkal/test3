import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock,faEnvelope,faHouseUser } from '@fortawesome/free-solid-svg-icons';
import "../../styles/UserSideBar.css";

const UserSideBar = ({ activepage }) => {
  return (
    <>
    <div className='usersidebar'>
        {
        activepage === 'accountsettings' ?
          <div className='s2'>
                 <FontAwesomeIcon icon={faUser} />
            <span>AccountSettings</span>
          </div>

          :
          <Link
          to='/user/accountsettings'
          className='stylenone'

        >
          <div className='s1'>
          <FontAwesomeIcon icon={faUser} />
            <span>Account Settings</span>
          </div>
        </Link>
    
      }


      {
        activepage === 'password' ?
          <div className='s2'>
              <FontAwesomeIcon icon={faLock} />
            <span>Password</span>
          </div>

          :
          <Link
            to='/user/password'>
            <div className='s1'>
            <FontAwesomeIcon icon={faLock} />
              <span>Password</span>
            </div>
          </Link>
      }

      {
        activepage === 'followedCommunities' ?
          <div className='s2'>
            <FontAwesomeIcon icon={faHouseUser} />
            <span>Followed Communties</span>
          </div>

          :
          <Link
            to='/user/followedcommunities'>
            <div className='s1'>
            <FontAwesomeIcon icon={faHouseUser} />
            <span>Followed Communties</span>
            </div>
          </Link>
      }

      {
        activepage === 'changenickname' ?

          <div className='s2'>
            

            <span>Display Name</span>
          </div>

          :
          <Link
            to='/user/changenickname'>
            <div className='s1'>
            

              <span>Display Name</span>
            </div>
          </Link>
      }
    </div>
    </>
  )
}

export default UserSideBar