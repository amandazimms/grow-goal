import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function GoalsPage(props) {
  //if we reach this page via social, it will trigger 'isFollowees=true', meaning we are looking at a followee's page
  const isFollowees = props.isFollowees;
  const goal = props.goal;

  //const user = useSelector((store) => store.user);
  const selectedFollowee = useSelector(store => store.selectedFollowee);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFollowees) {
    }
  }, []);

  const [isLiked, setIsLiked] = useState(goal.follower_like_status || false);
  const [likeImage, setLikeImage] = useState(isLiked ? './images/icons/HeartFilled.png' : './images/icons/HeartEmpty.png');                

  const setSelectedGoal = (goal) =>{
    dispatch( {type: 'SET_SELECTED_GOAL', payload: goal});
  }

  const toggleLiked = () => {
    if (isLiked) { //if goal was liked and we clicked, we mark UN liked
      setIsLiked(false);
      setLikeImage('./images/icons/HeartEmpty.png');
      //todo something like this for dispatch: taskToSend.is_complete = false;
    } 
    else { //if task was incomplete and we clicked, mark COMPLETE
      setIsLiked(true);
      setLikeImage('./images/icons/HeartFilled.png');
      //todo something like this for dispatch: taskToSend.is_complete = true;
    }
    //todo dispatch
  }

  return (
    <div className="cardAreaSmall"> 
        { isFollowees
          ? <div className="centerFlexContainer onTop">
              <Button onClick={toggleLiked} className="iconButton">
                <img className="iconImage iconImageXL" src={likeImage} alt="Like this goal"></img>
              </Button>
              <h4>{goal.like_count}</h4>
            </div>              
          : <></>
        }
        { isFollowees
          ?  <Button className="thumbnailButton" disabled>
              <img className="plantAvatarThumbnail" src={goal.current_avatar_path} alt={goal.current_avatar_path}/>
            </Button>
            //todo add logic for liking
          : <Link to="/goal" onClick={() => setSelectedGoal(goal)}>
              <Button className="thumbnailButton">
                <img className="plantAvatarThumbnail" src={goal.current_avatar_path} alt={goal.current_avatar_path}/>
              </Button>
            </Link>
        }             
        <h3 className="thumbnailGoalTitle">{goal.goal_name}</h3>
    </div>
  );
}

export default GoalsPage;
