import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">

      <img id="logo-nav" className="nav-icon nav-logo" src="/images/Logo.png"/>
      
      <div>

        <Link to="/social">
          <img id="social-nav" className="nav-icon" src="/images/icons/SocialIcon.png"/>
        </Link>
      
        <Link to="/goals">
          <img id="goals-home-nav" className="nav-icon" src="/images/icons/GrowIcon.png"/>
        </Link>

        <Link to="/profile">
          <div className="profileNavThumbnailParent">
            <img className="profileAvatarThumbnail" style={{zIndex: 10}} src={user.hat_image_path} alt="your profile image"/>
            <img className="profileAvatarThumbnail" style={{zIndex: 9}} src={user.hair_image_path} alt="your profile image"/>
            
            <img className="profileAvatarThumbnail" style={{zIndex: 6}} src={user.eyebrows_image_path} alt="your profile image"/>
            <img className="profileAvatarThumbnail" style={{zIndex: 4}} src={user.eyes_image_path} alt="your profile image"/>

            <img className="profileAvatarThumbnail" style={{zIndex: 2}} src={user.nose_image_path} alt="your profile image"/>
            <img className="profileAvatarThumbnail" style={{zIndex: 2}} src={user.detail_image_path} alt="your profile image"/>
            <img className="profileAvatarThumbnail" style={{zIndex: 3}} src={user.mouth_image_path} alt="your profile image"/>

            <img className="profileAvatarThumbnail" style={{zIndex: 1}} src={user.head_image_path} alt="your profile image"/>
            <img className="profileAvatarThumbnail" style={{zIndex: 0}} src={user.body_image_path} alt="your profile image"/>
          </div>
        </Link>


          {/* todo leaving these links here as they will be used elsewhere later */}
          {/* <Link className="navLink" to="/login">
              Login / Register
          </Link>
            <>
              <Link className="navLink" to="/user">
                Home
              </Link>

              <Link className="navLink" to="/info">
                Info Page
              </Link>

              <LogOutButton className="navLink" />
            </>

          <Link className="navLink" to="/about">
            About
          </Link> */}
      </div>
    </div>
  );
}

export default Nav;
