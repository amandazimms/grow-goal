import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import ImagePiece from '../ImagePiece/ImagePiece';

function ProfilePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector(store => store.user);

  const [randomQuote, setRandomQuote] = useState('Default Quote Here');

  const [detailMode, setDetailMode] = useState(false);
  const [toggleDetailImage, setDetailToggleImage] = useState(detailMode ? './images/icons/DetailsMainToggleD.png' : './images/icons/DetailsMainToggleM.png');
  
  //#region imageArrays
  const hatImages = [
    '/images/profileAvatars/Hat1.png',
    '/images/profileAvatars/Hat2.png',
    '/images/profileAvatars/Hat3.png',
    '/images/profileAvatars/Hat4.png',
    '/images/profileAvatars/Blank.png'
  ];
  const hairImages = [
    '/images/profileAvatars/Hair1.png',
    '/images/profileAvatars/Hair2.png',
    '/images/profileAvatars/Hair3.png',
    '/images/profileAvatars/Hair4.png',
    '/images/profileAvatars/Hair5.png',
    '/images/profileAvatars/Hair6.png',
    '/images/profileAvatars/Hair7.png',
    '/images/profileAvatars/Hair8.png'
  ];
  const eyebrowsImages = [
    '/images/profileAvatars/Eyebrows1.png',
    '/images/profileAvatars/Eyebrows2.png',
    '/images/profileAvatars/Eyebrows3.png',
    '/images/profileAvatars/Blank.png'
  ];
  const eyesImages = [
    '/images/profileAvatars/Eyes1.png',
    '/images/profileAvatars/Eyes2.png',
    '/images/profileAvatars/Eyes3.png',
    '/images/profileAvatars/Eyes4.png',
    '/images/profileAvatars/Eyes5.png',
  ];
  const detailImages = [
    '/images/profileAvatars/Detail1.png',
    '/images/profileAvatars/Detail2.png',
    '/images/profileAvatars/Detail3.png',
    '/images/profileAvatars/Blank.png'
  ];
  const mouthImages = [
    '/images/profileAvatars/Mouth1.png',
    '/images/profileAvatars/Mouth2.png',
    '/images/profileAvatars/Mouth3.png',
    '/images/profileAvatars/Mouth4.png',
    '/images/profileAvatars/Mouth5.png'
  ];
  const noseImages = [
    '/images/profileAvatars/Nose1.png',
    '/images/profileAvatars/Nose2.png',
    '/images/profileAvatars/Nose3.png',
    '/images/profileAvatars/Nose4.png'
  ];
  const headImages = [
    '/images/profileAvatars/Head1.png',
    '/images/profileAvatars/Head2.png',
    '/images/profileAvatars/Head3.png',
    '/images/profileAvatars/Head4.png'
  ];
  const bodyImages = [
    '/images/profileAvatars/Body1.png',
    '/images/profileAvatars/Body2.png',
    '/images/profileAvatars/Body3.png',
    '/images/profileAvatars/Body4.png',
    '/images/profileAvatars/Body5.png'
  ];
  let quotesArray = [
        'Way to go!',
        'Nice work!',
        'GET IT!',
        'Keep it up!',
        'Impressive!',
        "Crushin' it"
    ];
    //#endregion  

  const quoteRandomizer = () => {
    let index = Math.floor(Math.random() * quotesArray.length);
    setRandomQuote(quotesArray[index]);
    //floor rounds the number down, random privides a number between 0-1, 
  }

  useEffect(() => {
    quoteRandomizer();
  }, []);

  const toggleDetailMode = () => {
    if (detailMode) { //if we were previously in detailMode, switch to Main mode
      setDetailMode(false);
      setDetailToggleImage('./images/icons/DetailsMainToggleM.png');
    } 
    else { //if we were previously in Main mode, switch to detailMode
      setDetailMode(true);
      setDetailToggleImage('./images/icons/DetailsMainToggleD.png');
    }
  }

  return (
    <div className="container">
      <h2 className="pageTitle">Profile</h2>

      <h3 className="pageSubTitle">{user.username}</h3>

      <div className="centerFlexContainer">

        <div style={{height: "380px", position: "relative"}} className="cardArea cardBlue cardParent cardParentProfileAvatar"> 


          <div className="avatarImagePieceParent">
              {/*HAT*/} <ImagePiece images={hatImages} topDistance={"40px"} zIndex={10} zoomedClassNameToPass={detailMode ? "avatarImagePieceZoomed" : ""} detailEditingMode={!detailMode}/>
              {/*HAIR*/} <ImagePiece images={hairImages} topDistance={"90px"} zIndex={9} zoomedClassNameToPass={detailMode ? "avatarImagePieceZoomed" : ""} detailEditingMode={!detailMode}/>

              {/*EYEBROWS*/} <ImagePiece images={eyebrowsImages} topDistance={"60px"} zIndex={6} zoomedClassNameToPass={detailMode ? "avatarImagePieceZoomed" : ""} detailEditingMode={detailMode}/>
              {/*EYES*/} <ImagePiece images={eyesImages} topDistance={"90px"} zIndex={3} zoomedClassNameToPass={detailMode ? "avatarImagePieceZoomed" : ""} detailEditingMode={detailMode}/>
              {/*DETAIL*/} <ImagePiece images={detailImages} topDistance={"145px"} zIndex={2} zoomedClassNameToPass={detailMode ? "avatarImagePieceZoomed" : ""} detailEditingMode={detailMode}/>
              {/*NOSE*/} <ImagePiece images={noseImages} topDistance={"115px"} zIndex={2} zoomedClassNameToPass={detailMode ? "avatarImagePieceZoomed" : ""} detailEditingMode={detailMode}/>
              {/*MOUTH*/} <ImagePiece images={mouthImages} topDistance={"180px"} zIndex={2} zoomedClassNameToPass={detailMode ? "avatarImagePieceZoomed" : ""} detailEditingMode={detailMode}/>

              {/*HEAD*/} <ImagePiece images={headImages} topDistance={"150px"} zIndex={1} zoomedClassNameToPass={detailMode ? "avatarImagePieceZoomed" : ""} detailEditingMode={!detailMode}/>
              {/*BODY*/} <ImagePiece images={bodyImages} topDistance={"200px"} zIndex={0} zoomedClassNameToPass={detailMode ? "avatarImagePieceZoomed" : ""} detailEditingMode={!detailMode}/>
          </div>  

          <div className="bottomButtonContainer">
            <Button onClick={toggleDetailMode} className="iconButton"> 
              <img className="iconImageToggle" src={toggleDetailImage} alt="toggle edit details/main"></img>
            </Button> 
          </div>

        </div>

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
