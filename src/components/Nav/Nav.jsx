import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import ProfileImageThumbnail from '../ProfileImageThumbnail/ProfileImageThumbnail';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">

      <img id="logo-nav" className="nav-icon nav-logo" src="/images/icons/LogoNav.png"/>
      
      <div className="nav-right">

        <Link to="/social">
          <div className="cardAreaNavIcon cardRedVivid">
            <img id="social-nav" className="nav-icon" src="/images/icons/SocialIcon.png"/>
          </div>
        </Link>
      
        <Link to="/goals">
          <div className="cardAreaNavIcon cardBlueVivid">
            <img id="goals-home-nav" className="nav-icon" src="/images/icons/GrowIcon.png"/>
          </div>
        </Link>

        <Link to="/profile">
          <div className="cardAreaNavIcon cardYellowVivid" style={{padding: "0 0 10px 0"}}>
            <ProfileImageThumbnail className="nav-icon" userToDisplay={user} containerWidth={"70px"} />
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Nav;
