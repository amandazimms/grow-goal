import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

function AddFollowee(props) {

  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState(props.text || '');

  useEffect(() => {
  }, []);

  const handleChange = (event) =>{
    setSearchText(event.target.value);
  }

  const searchButton = () => {
    dispatch({ type:'SEARCH_FOR_FOLLOWEE', payload: {search_text: searchText, follower_id: user.id} });
    //dispatch({ type: 'ADD_FOLLOWEE', payload: {followee: searchText, follower: user.id} });
    props.onLeaveAdd();
  }

  const cancelButton = () => {
    props.onLeaveAdd();
  }


  return (
    <>
        <h4 className="pageSubTitle">Find User:</h4>

        <input type="text" onChange={ (event) => handleChange(event) }></input>
        
        <Button onClick={searchButton} className="iconButton confirmButton">
          <img className="iconImage" src='./images/icons/GreenCheck.png' alt="Confirm new task"></img>
        </Button>

        <Button onClick={cancelButton} className="iconButton cancelButton">
          <img className="iconImage" src='./images/icons/RedEx.png' alt="Cancel new task"></img>
        </Button>

    </>
  );
}

export default AddFollowee;
