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
  
  const hatImages = [
    '/images/profileAvatars/Hat1.png',
    '/images/profileAvatars/Hat2.png',
    '/images/profileAvatars/Hat3.png',
    '/images/profileAvatars/Hat4.png',
    '/images/profileAvatars/Blank.png'
  ]
  const hairImages = [
    '/images/profileAvatars/Hair1.png',
    '/images/profileAvatars/Hair2.png',
    '/images/profileAvatars/Hair3.png',
    '/images/profileAvatars/Hair4.png',
    '/images/profileAvatars/Hair5.png',
    '/images/profileAvatars/Hair6.png',
    '/images/profileAvatars/Hair7.png',
    '/images/profileAvatars/Hair8.png'
  ]
  const eyebrowsImages = [
    '/images/profileAvatars/Eyebrows1.png',
    '/images/profileAvatars/Eyebrows2.png',
    '/images/profileAvatars/Eyebrows3.png',
    '/images/profileAvatars/Blank.png'
  ]
  const eyesImages = [
    '/images/profileAvatars/Eyes1.png',
    '/images/profileAvatars/Eyes2.png',
    '/images/profileAvatars/Eyes3.png',
    '/images/profileAvatars/Eyes4.png',
    '/images/profileAvatars/Eyes5.png',
  ]
  const detailImages = [
    '/images/profileAvatars/Detail1.png',
    '/images/profileAvatars/Detail2.png',
    '/images/profileAvatars/Detail3.png',
    '/images/profileAvatars/Blank.png'
  ]
  const mouthImages = [
    '/images/profileAvatars/Mouth1.png',
    '/images/profileAvatars/Mouth2.png',
    '/images/profileAvatars/Mouth3.png',
    '/images/profileAvatars/Mouth4.png',
    '/images/profileAvatars/Mouth5.png'
  ]
  const noseImages = [
    '/images/profileAvatars/Nose1.png',
    '/images/profileAvatars/Nose2.png',
    '/images/profileAvatars/Nose3.png',
    '/images/profileAvatars/Nose4.png'
  ]
  const headImages = [
    '/images/profileAvatars/Head1.png',
    '/images/profileAvatars/Head2.png',
    '/images/profileAvatars/Head3.png',
    '/images/profileAvatars/Head4.png'
  ]
  const bodyImages = [
    '/images/profileAvatars/Body1.png',
    '/images/profileAvatars/Body2.png',
    '/images/profileAvatars/Body3.png',
    '/images/profileAvatars/Body4.png',
    '/images/profileAvatars/Body5.png'
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
              {/*HAT*/} <ImagePicker images={hatImages} topDistance={"0px"} zIndex={10}/>
              {/*HAIR*/} <ImagePicker images={hairImages} topDistance={"25px"} zIndex={9}/>
              {/*EYEBROWS*/} <ImagePicker images={eyebrowsImages} topDistance={"60px"} zIndex={6}/>
              {/*EYES*/} <ImagePicker images={eyesImages} topDistance={"90px"} zIndex={3}/>
              {/*DETAIL*/} <ImagePicker images={detailImages} topDistance={"115px"} zIndex={2}/>
              {/*NOSE*/} <ImagePicker images={noseImages} topDistance={"145px"} zIndex={2}/>
              {/*MOUTH*/} <ImagePicker images={mouthImages} topDistance={"180px"} zIndex={2}/>
              {/*HEAD*/} <ImagePicker images={headImages} topDistance={"220px"} zIndex={1}/>
              {/*BODY*/} <ImagePicker images={bodyImages} topDistance={"265px"} zIndex={0}/>
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
