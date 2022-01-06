import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AddFollowee from '../AddFollowee/AddFollowee';

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

      <div className="centerFlexContainer">

        { searchOpen 
          ? <AddFollowee onLeaveAdd={closeSearch}/>
          : <Button onClick={openSearch} className="iconButton">
              <img className="iconImage iconImageXL" src='./images/icons/AddIcon.png' alt="Add followed user"></img>
            </Button> 
        }
        
      </div>  

      { searchOpen
        ? 
          <>
          <h3 className="pageSubTitle">Search Results</h3>
          <div className="cards">
            {/* todo we reused some css classes that could be updated - "goal" and "plant" verbage below */}
            {searchResults.map(foundUser => {
              
              return (
                <div className="cardAreaSmall" key={foundUser.id}>     
                  <Button className="thumbnailButton">
                    <div className="profileThumbnailParent">
                      <img className="profileAvatarThumbnail" style={{zIndex: 10}} src={foundUser.hat_image_path} alt="followee's profile image"/>
                      <img className="profileAvatarThumbnail" style={{zIndex: 9}} src={foundUser.hair_image_path} alt="followee's profile image"/>
                      
                      <img className="profileAvatarThumbnail" style={{zIndex: 6}} src={foundUser.eyebrows_image_path} alt="followee's profile image"/>
                      <img className="profileAvatarThumbnail" style={{zIndex: 4}} src={foundUser.eyes_image_path} alt="followee's profile image"/>

                      <img className="profileAvatarThumbnail" style={{zIndex: 2}} src={foundUser.nose_image_path} alt="followee's profile image"/>
                      <img className="profileAvatarThumbnail" style={{zIndex: 2}} src={foundUser.detail_image_path} alt="followee's profile image"/>
                      <img className="profileAvatarThumbnail" style={{zIndex: 3}} src={foundUser.mouth_image_path} alt="followee's profile image"/>

                      <img className="profileAvatarThumbnail" style={{zIndex: 1}} src={foundUser.head_image_path} alt="followee's profile image"/>
                      <img className="profileAvatarThumbnail" style={{zIndex: 0}} src={foundUser.body_image_path} alt="followee's profile image"/>
                    </div>
                  </Button>

                  <h3 className="thumbnailGoalTitle">{foundUser.username}</h3>

                  <div className="centerFlexContainer">
                    <Button onClick={() => addThisFollowee(foundUser)} className="iconButton">
                      <img className="iconImage iconImageXL" src='./images/icons/AddIcon.png' alt="Add followed user"></img>
                    </Button> 
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
                <div className="cardAreaSmall" key={followee.id}>     
                  <Link to="/followee-goals" onClick={() => setSelectedFollowee(followee)}>
                    <Button className="thumbnailButton">
                      <div className="profileThumbnailParent">
                        <img className="profileAvatarThumbnail" style={{zIndex: 10}} src={followee.hat_image_path} alt="followee's profile image"/>
                        <img className="profileAvatarThumbnail" style={{zIndex: 9}} src={followee.hair_image_path} alt="followee's profile image"/>
                        
                        <img className="profileAvatarThumbnail" style={{zIndex: 6}} src={followee.eyebrows_image_path} alt="followee's profile image"/>
                        <img className="profileAvatarThumbnail" style={{zIndex: 4}} src={followee.eyes_image_path} alt="followee's profile image"/>

                        <img className="profileAvatarThumbnail" style={{zIndex: 2}} src={followee.nose_image_path} alt="followee's profile image"/>
                        <img className="profileAvatarThumbnail" style={{zIndex: 2}} src={followee.detail_image_path} alt="followee's profile image"/>
                        <img className="profileAvatarThumbnail" style={{zIndex: 3}} src={followee.mouth_image_path} alt="followee's profile image"/>

                        <img className="profileAvatarThumbnail" style={{zIndex: 1}} src={followee.head_image_path} alt="followee's profile image"/>
                        <img className="profileAvatarThumbnail" style={{zIndex: 0}} src={followee.body_image_path} alt="followee's profile image"/>
                      </div>
                    </Button>
                  </Link>
                  <h3 className="thumbnailGoalTitle">{followee.username}</h3>
                </div>
                );
            })}

          </div>  
          </>
      }
      

    </div>
  );
}

export default SocialPage;
