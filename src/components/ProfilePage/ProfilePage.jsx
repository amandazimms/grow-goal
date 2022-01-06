import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import ImagePiece from '../ImagePiece/ImagePiece';
import ProfileImage from '../ProfileImage/ProfileImage';

function ProfilePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector(store => store.user);

  const dispatch = useDispatch();

  const [randomQuote, setRandomQuote] = useState('Default Quote Here');
  
  const [zoomedImageClass, setZoomedImageClass] = useState("");
  const [zoomedDividerClass, setZoomedDividerClass] = useState("");

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

      <h2 className="pageTitle">Profile</h2>
      <h3 className="pageSubTitle">{user.username}</h3>

      <div className="centerFlexContainer">
        <ProfileImage />
      </div>
        
     


      <h4 className="centerText">Goals Achieved:</h4>
      <h4 className="centerText">Tasks Completed:</h4>
      <h4 className="centerText">{randomQuote}</h4>

      <div className="centerFlexContainer">
        <LogOutButton className="buttonButton"/>
      </div>
      
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
