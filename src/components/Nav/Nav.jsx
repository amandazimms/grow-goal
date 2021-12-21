import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">

      <img id="logo-nav" className="nav-icon" src="/images/Logo.png"/>
      
      <div>
      
        <Link to="/goals">
          <img id="goals-home-nav" className="nav-icon" src="/images/icons/GrowIcon.png"/>
        </Link>

        <Link to="/profile">
          <img id="profile-nav" className="nav-icon" src="/images/icons/ProfilePH.png"/>
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
