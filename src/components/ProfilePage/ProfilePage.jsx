import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import ImagePicker from '../ImagePicker/ImagePicker';

function ProfilePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector(store => store.user);

  const [randomQuote, setRandomQuote] = useState('Default Quote Here');
  
  const bodyImages = [
    '/images/profileAvatars/Body1.png',
    '/images/profileAvatars/Body2.png'
  ]

  const headImages = [
    '/images/profileAvatars/Head1.png',
    '/images/profileAvatars/Head2.png'
  ]

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
        <div className="cardArea cardBlue">
          <div style={{position:"relative"}}className="cardParent cardParentProfileAvatar">
              <ImagePicker topDistance={"130px"} images={headImages}/>
              <ImagePicker topDistance={"230px"} images={bodyImages}/>
          </div>      
        </div>
      </div>
        
      <div className="centerFlexContainer">
        <h3 className="thumbnailGoalTitle">{user.username}</h3>
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
