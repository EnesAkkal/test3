import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserTie,faX,faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "../../styles/communitysidebar.css";

const CommunitySideBar = ({ activepage }) => {
  return (
    <>
    <div className='communitysidebar'>
        {
        activepage === 'kickuser' ?
          <div className='s2'>
                 <FontAwesomeIcon icon={faX}  />
            <span>Kickuser</span>
          </div>

          :
          <Link
          to='/community/settings/kickuser'

        >
          <div className='s1'>
          <FontAwesomeIcon icon={faX} />
            <span>Kick User</span>
          </div>
        </Link>
    
      }


      {
        activepage === 'transferownership' ?
          <div className='s2'>
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            <span>Transfer Ownership</span>
          </div>

          :
          <Link
            to='/community/settings/transferownership' className='stylenone'>
            <div className='s1'>
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
              <span>Transfer Ownership</span>
            </div>
          </Link>
      }

{
        activepage === 'roles' ?
          <div className='s2'>
             <FontAwesomeIcon icon={faUserTie} />
            <span>Assign Community Moderators</span>
          </div>

          :
          <Link
            to='/community/settings/roles' className='stylenone'>
            <div className='s1'>
            <FontAwesomeIcon icon={faUserTie} />
              <span>Assign Community Moderators</span>
            </div>
          </Link>
      }

      {
        activepage === 'inviteusers' ?

          <div className='s2'>
            <FontAwesomeIcon icon={faUserPlus} />
            <span>Invite Users</span>
          </div>

          :
          <Link
            to='/community/settings/invite' className='stylenone'>
            <div className='s1'>
            <FontAwesomeIcon icon={faUserPlus} />
              <span>Invite Users</span>
            </div>
          </Link>
      }
    </div>
    </>
  )
}

export default CommunitySideBar