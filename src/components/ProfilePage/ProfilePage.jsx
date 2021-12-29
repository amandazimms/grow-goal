import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';

function ProfilePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector(store => store.user);

  const [randomQuote, setRandomQuote] = useState('Default Quote Here');
  
  let quotesArray = [
        'Way to go!',
        'Nice work!',
        'GET IT!',
        'Keep it up!',
        'Impressive!',
        "Crushin' it"
    ];

  const quoteRandomizer = () => {
    let index = Math.floor(Math.random() * quotesArray.length);
    setRandomQuote(quotesArray[index]);
    //floor rounds the number down, random privides a number between 0-1, 
  }

  useEffect(() => {
    quoteRandomizer();
  }, []);

  return (
    <div className="container">

      <div className="centerFlexContainer">
        <div className="cardAreaSmall">
          <Button className="thumbnailButton" disabled>
            <img className="plantAvatarThumbnail" src={user.image_path} alt="user's profile avatar"/>
          </Button>

          <h3 className="thumbnailGoalTitle">{user.username}</h3>
        </div>
      </div>

      <div className="centerFlexContainer">
        <h4>Goals Achieved:</h4>
      </div>
      <div className="centerFlexContainer">
        <h4>Tasks Completed:</h4>
      </div>  
      <div className="centerFlexContainer">
        <h4>{randomQuote}</h4>
      </div>  

      <div className="centerFlexContainer">
        <LogOutButton className="buttonButton"/>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
