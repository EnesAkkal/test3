import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUser, faHome, faArrowLeft, faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import '../styles/header.css';
import SearchBar from './SearchBar.js';

function HeaderComponent() {

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/login';
  }

  const profile = () => {
    window.location.href = '/user/accountsettings'
  }

  const home = () => {
    window.location.href = '/home';
  }

  const communityCreate = () => {
    window.location.href = '/community/createpage';
  }

  const goBack = () => {
    window.history.back();
  }

  return (
    <header className="header" id="header">
      <div className="row">
        <div className="homefeed-container">
          <div className="header-content">
            <SearchBar />
            <div className='home'>
                  <FontAwesomeIcon icon={faArrowLeft} className='home' onClick={goBack} />
                </div>
            <div className="nav-group">
              <ul>
                <div className="home">
                  <a onClick={home}> <FontAwesomeIcon icon={faHome} className='home' /> </a>
                </div>
                <li>
                  <a href="#"><FontAwesomeIcon icon={faBell} title="Notifications" /></a>
                </li>
                <li>
                  <a className="createCommunity"> <FontAwesomeIcon icon={faHouseMedical} onClick={communityCreate} /></a>
                </li>
                <li className="join">
                  <a href="#">
                    <FontAwesomeIcon icon={faUser} onClick={profile} />
                  </a>
                </li>
                <li>
                  <a className="logout"> <FontAwesomeIcon icon={faSignOut} onClick={handleLogout} /></a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderComponent;
