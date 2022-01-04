import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AddFollowee(props) {

  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const searchResults = useSelector(store => store.search);

  const [searchText, setSearchText] = useState(props.text || '');

  useEffect(() => {
  }, []);

  const doSearch = (event) => {
    dispatch({ type:'SEARCH_FOR_FOLLOWEE', payload: {search_text: event.target.value, follower_id: user.id} });
  }

  const cancelButton = () => {
    props.onLeaveAdd();
  }


  return (
    <>
        <h4 className="pageSubTitle">Find User:</h4>

        <input type="text" onChange={ (event) => doSearch(event) }></input>
      
        <Button onClick={doSearch} className="iconButton confirmButton">
          <img className="iconImage" src='./images/icons/GreenCheck.png' alt="Confirm new task"></img>
        </Button>

        <Button onClick={cancelButton} className="iconButton cancelButton">
          <img className="iconImage" src='./images/icons/RedEx.png' alt="Cancel new task"></img>
        </Button>

    </>
  );
}

export default AddFollowee;
