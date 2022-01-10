import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function GoalItem(props) {
  //if we reach this page via social, it will trigger 'isFollowees=true', meaning we are looking at a followee's page
  const isFollowees = props.isFollowees;
  const goal = props.goal;

  const user = useSelector(store => store.user);
  const selectedFollowee = useSelector(store => store.selectedFollowee);

  const [addAccomplishedBackground, setAddAccomplishedBackground] = useState(goal.is_accomplished);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFollowees) {
    }
  }, []);

  const [isLiked, setIsLiked] = useState(isFollowees ? goal.follower_like_status : true);
  const [likeImage, setLikeImage] = useState(isLiked ? './images/icons/HeartFilled.png' : './images/icons/HeartEmpty.png');                

  const setSelectedGoal = (goal) =>{
    dispatch( {type: 'SET_SELECTED_GOAL', payload: goal});
  }

  const toggleLiked = () => {
    console.log('toggle liked');
    
    if (isLiked) { //if goal was liked and we clicked, we mark UN liked
      setIsLiked(false);
      setLikeImage('./images/icons/HeartEmpty.png');
      dispatch({type: 'DELETE_LIKE', payload: {goal_id: goal.goal_id, follower_like_status: false, follower_id: user.id, followee_id: selectedFollowee.id} });
    } 
    else { //if goal was unliked and we clicked, mark LIKED
      setIsLiked(true);
      setLikeImage('./images/icons/HeartFilled.png');
      dispatch({type: 'ADD_LIKE', payload: {goal_id: goal.goal_id, follower_like_status: true, follower_id: user.id, followee_id: selectedFollowee.id} });
    }
  }

  const doNothing = () => {  }

  return (
    <>
      <div className={  addAccomplishedBackground 
                        ?   isFollowees 
                            ? `accomplishedGoalBackground cardArea cardAreaSmall` 
                            : `animate__animated animate__fadeIn accomplishedGoalBackground cardArea cardAreaSmall clickable`
                        :   isFollowees
                            ? `animate__animated animate__fadeIn cardArea cardAreaSmall`
                            : `animate__animated animate__fadeIn cardArea cardAreaSmall clickable` }> 
            
          {/* "like" heart */}
          <div className={ isFollowees ? `centerFlexContainer like clickable` : `centerFlexContainer like` }>
            <img className="iconImage iconImageXL" onClick={isFollowees ? toggleLiked : doNothing} src={likeImage} alt="Like this goal"></img>
            <h4>{goal.like_count}</h4>
          </div>              
            
          
          { isFollowees
            ?  <img className="plantAvatarThumbnail" src={goal.current_avatar_path} alt={goal.current_avatar_path}/>
              //todo add logic for liking
            : <Link to="/goal" onClick={() => setSelectedGoal(goal)}>
                <img className="plantAvatarThumbnail" src={goal.current_avatar_path} alt={goal.current_avatar_path}/>
              </Link>
          } 
          <h3 className="thumbnailGoalTitle">{goal.goal_name}</h3>
      </div>
    </>
  );
}

export default GoalItem;
