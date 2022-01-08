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

      <img id="logo-nav" className="nav-icon nav-logo" src="/images/Logo.png"/>
      
      <div className="nav-right">

        <Link to="/social">
          <img id="social-nav" className="nav-icon" src="/images/icons/SocialIcon.png"/>
        </Link>
      
        <Link to="/goals">
          <img id="goals-home-nav" className="nav-icon" src="/images/icons/GrowIcon.png"/>
        </Link>

        <Link to="/profile">
          <ProfileImageThumbnail className="nav-icon" userToDisplay={user} containerWidth={"70px"} />
        </Link>

      </div>
    </div>
  );
}

export default Nav;
