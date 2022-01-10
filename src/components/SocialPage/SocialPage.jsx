import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AddFollowee from '../AddFollowee/AddFollowee';
import ProfileImageThumbnail from '../ProfileImageThumbnail/ProfileImageThumbnail';

function SocialPage() {

  const store = useSelector(store => store);
  const user = useSelector(store => store.user);

  const searchResults = useSelector(store => store.search);

  const selectedFollowee = useSelector(store => store.selectedFollowee);
  const followees = useSelector(store => store.followeeUsers);

  const [searchOpen, setSearchOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_FOLLOWEE_USERS', payload: user.id }); 
    dispatch({ type: 'FETCH_ALL_PROFILE_AVATARS' });

  }, []);

  const setSelectedFollowee = (followie) =>{
    dispatch( {type: 'SET_SELECTED_FOLLOWEE', payload: followie});
  }

  const openSearch = () => {
    setSearchOpen(true);
  }

  const closeSearch = () => {
    dispatch({ type: 'UNSET_SEARCH_RESULTS' });
    setSearchOpen(false);
  }

  const addThisFollowee = (foundUser) => {
    dispatch({ type: 'ADD_FOLLOWEE', payload: {followee: foundUser.id, follower: user.id} });
    closeSearch();
  }


  return (
    <div className="container">
      <h2 className="pageTitle">Social</h2>


      { searchOpen 
        ? <AddFollowee onLeaveAdd={closeSearch}/>
        : <div className="centerFlexContainer">
            <img onClick={openSearch} className="iconImage iconImageXL clickableSmall" src='./images/icons/AddIcon.png' alt="Add followed user"></img>
          </div>
      }
      

      { searchOpen
        ? 
          <>
          <h3 className="pageSubTitle">Search Results</h3>
          <div className="cards">
            {/* todo we reused some css classes that could be updated - "goal" and "plant" verbage below */}
            {searchResults.map(foundUser => {
              
              return (
                <div className="animate__animated animate__fadeIn cardArea cardAreaSmall cardBlue clickable" style={{padding: "0 0 10px 0"}} key={foundUser.id}>  
                  <ProfileImageThumbnail userToDisplay={foundUser} containerWidth={"160px"}/>

                  <h3 className="thumbnailGoalTitle">{foundUser.username}</h3>

                  <div className="centerFlexContainer">
                    <img onClick={() => addThisFollowee(foundUser)} className="iconImage iconImageXL clickableSmall" src='./images/icons/AddIcon.png' alt="Add followed user"></img>
                  </div>

                </div>
                );
            })}

          </div>  
          </>

        : 
          <>
          <h3 className="pageSubTitle">Users I Follow</h3>
          <div className="cards">
            {/* todo we reused some css classes that could be updated - "goal" and "plant" verbage below */}
            {followees.map(followee => {
              
              return (
                <Link to="/followee-goals" key={followee.id}>
                  <div  onClick={() => setSelectedFollowee(followee)} 
                        className="animate__animated animate__fadeIn cardArea cardAreaSmall cardBlue clickable" style={{padding: "0 0 10px 0"}}>  
                    <ProfileImageThumbnail userToDisplay={followee} containerWidth={"160px"}/>
                    <h3 className="thumbnailGoalTitle">{followee.username}</h3>
                  </div>
                </Link>  
                );
            })}

          </div>  
          </>
      }
      

    </div>
  );
}

export default SocialPage;
