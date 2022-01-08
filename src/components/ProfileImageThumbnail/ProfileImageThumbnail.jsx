import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import ImagePiece from '../ImagePiece/ImagePiece';

function ProfileImageThumbnail(props) {
  
  const userToDisplay = props.userToDisplay;
  
  const containerStyles = {
    width: props.containerWidth,
    height: "auto",
  }

  return (
    <div className="avatarImagePieceParent" style={containerStyles}>
      {/*HAT*/}<img className='avatarImagePiece' style={{zIndex: 10}} src={userToDisplay.hat_image_path} alt="profile avatar image"/>
      {/*HAIR*/}<img className='avatarImagePiece' style={{zIndex: 9}} src={userToDisplay.hair_image_path} alt="profile avatar image"/>
      
      {/*BROWS*/}<img className='avatarImagePiece' style={{zIndex: 6}} src={userToDisplay.eyebrows_image_path} alt="profile avatar image"/>
      {/*EYES*/}<img className='avatarImagePiece' style={{zIndex: 4}} src={userToDisplay.eyes_image_path} alt="profile avatar image"/>
      
      {/*NOSE*/}<img className='avatarImagePiece' style={{zIndex: 2}} src={userToDisplay.nose_image_path} alt="profile avatar image"/>
      {/*DEET*/}<img className='avatarImagePiece' style={{zIndex: 2}} src={userToDisplay.detail_image_path} alt="profile avatar image"/>
      {/*MOUTH*/}<img className='avatarImagePiece' style={{zIndex: 3}} src={userToDisplay.mouth_image_path} alt="profile avatar image"/>
      
      {/*HEAD*/}<img className='avatarImagePiece' style={{zIndex: 1}} src={userToDisplay.head_image_path} alt="profile avatar image"/>
      {/*BODY*/}<img className='avatarImagePieceBase' style={{zIndex: 0}} src={userToDisplay.body_image_path} alt="profile avatar image"/>

    </div>  
  );
}

export default ProfileImageThumbnail;
