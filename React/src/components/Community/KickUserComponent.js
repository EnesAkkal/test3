import React from 'react'
import "../../styles/AccountSettings.css";

function KickUserComponent() {
  return (
    <>
    <div className='kick-main'>
      <div className='list'>
        <div className='line'>
        <div className='user'>
          <div className='details'>
            <h3 className='username'> Captain-D</h3>
          </div>
        </div>
        <div className='role'>
          <span></span>
          <p>Owner</p>
        </div>
       <div className='location'>
        <p>Turkey</p>
       </div>
       <div className='phone'>
        <p>+9021321312323</p>
       </div>
       <div className='contact'>
        <a href='#' className='btn btn-red'>Kick User</a>
       </div>
       <div className='action'>
        <div className='icon'>
          <span></span>
          <span></span>
          <span></span>
        </div>
        </div>
       </div>
      </div>
      </div>
  </>
  )
}

export default KickUserComponent