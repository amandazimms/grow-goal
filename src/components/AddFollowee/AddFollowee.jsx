import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function AddFollowee(props) {

  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const searchResults = useSelector(store => store.search);

  const [searchText, setSearchText] = useState(props.text || '');

  const doSearch = (event) => {
    dispatch({ type:'SEARCH_FOR_FOLLOWEE', payload: {search_text: event.target.value, follower_id: user.id} });
  }

  const cancelButton = () => {
    props.onLeaveAdd();
  }


  return (
      <div className="centerFlexContainer">
        <div className="searchInputContainer">
          <input type="text" className="mediumInput" placeholder="Enter user to search for" onChange={ (event) => doSearch(event) }></input>
          <img onClick={cancelButton} className="iconImage cancelButton searchCancelButton" src='./images/icons/RedEx.png' alt="Cancel search"></img>
        </div>
      </div>
  );
}

export default AddFollowee;
