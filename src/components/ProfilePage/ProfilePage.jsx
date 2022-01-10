import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector} from 'react-redux';
import { Form } from 'react-bootstrap';
import { useEffect } from 'react';
import ImagePiece from '../ImagePiece/ImagePiece';
import ProfileImage from '../ProfileImage/ProfileImage';

function ProfilePage() {
  const user = useSelector(store => store.user);

  const dispatch = useDispatch();
  
  const [zoomedImageClass, setZoomedImageClass] = useState("");
  const [zoomedDividerClass, setZoomedDividerClass] = useState("");

  const [randomQuote, setRandomQuote] = useState('Default Quote Here');

  let quotesArray = [
    'Way to go!',
    'Nice work!',
    'GET IT!',
    'Keep it up!',
    'Impressive!',
    "Crushin' it",
    'Wowza!',
    'Good work'
  ];

  const quoteRandomizer = () => {
    let index = Math.floor(Math.random() * quotesArray.length);
    setRandomQuote(quotesArray[index]);

    // 

    //floor rounds the number down, random privides a number between 0-1, 
  }

  useEffect(() => {
    quoteRandomizer();

    //dispatch({ type: 'FETCH_USER' });
  }, []);

  return (
    <div className="container">

      <h2 className="pageTitle">Profile</h2>
      <h3 className="pageSubTitle">{user.username}</h3>

      <div className="centerFlexContainer">
        <ProfileImage />
      </div>
        
     


      <h4 className="centerText">Goals Achieved: {user.goals_achieved}</h4>      
      <h4 className="centerText">Tasks Completed: {user.tasks_completed}</h4>

      <div className="fortyPxSpacer"></div>

      <h4 className="centerText">{randomQuote}</h4>

      <div className="fortyPxSpacer"></div>

      <div className="centerFlexContainer">
        <LogOutButton className="buttonButton"/>
      </div>
      
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
