import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function ProfilePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector(store => store.user);

  return (
    <div className="container">
      <p>{JSON.stringify(user)}</p>
      <h2>Profile Page</h2>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="buttonButton"/>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
