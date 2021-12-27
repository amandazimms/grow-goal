import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AddFollowee from '../AddFollowee/AddFollowee';

function SocialPage() {
  const followees = useSelector(store => store.followeeUsers);
  const user = useSelector(store => store.user);
  const selectedFollowee = useSelector(store => store.selectedFollowee);

  const [addingFollowed, setAddingFollowed] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_FOLLOWEE_USERS', payload: user.id }); 
  }, []);

  const setSelectedFollowee = (followie) =>{
    console.log('will set sf to:', followie);
    dispatch( {type: 'SET_SELECTED_FOLLOWEE', payload: followie});
  }

  const addFollowee = () => {
    setAddingFollowed(true);
  }

  return (
    <div className="container">
      <h2 className="pageTitle">Social</h2>

      <div className="centerFlexContainer">

        { addingFollowed 
          ? <AddFollowee onLeaveAdd={()=>setAddingFollowed(false)}/>
          : <Button onClick={addFollowee} className="iconButton">
              <img className="iconImage iconImageXL" src='./images/icons/AddIcon.png' alt="Add followed user"></img>
            </Button> 
        }
        
      </div>  


      <div className="cards">
        {followees.map(followee => {
          return (
            <div className="cardAreaSmall" key={followee.id}>     
              <Link to="/follower-goals" onClick={() => setSelectedFollowee(followee)}>
                <Button className="thumbnailButton">
                  <img className="plantAvatarThumbnail" src={followee.profile_avatar_path} alt={followee.profile_avatar_path}/>
                </Button>
              </Link>
              <h3 className="thumbnailGoalTitle">{followee.username}</h3>
            </div>
            );
        })}
      </div>  

    </div>
  );
}

export default SocialPage;
