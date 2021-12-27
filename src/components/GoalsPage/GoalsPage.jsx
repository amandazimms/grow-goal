import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

function GoalsPage(props) {
  //if we reach this page via social, it will trigger 'isFollowees=true', meaning we are looking at a followee's page
  const isFollowees = props.isFollowees;

  const goals = useSelector(store => isFollowees ? store.followeeGoals : store.goal);
  const user = useSelector((store) => store.user);
  const selectedFollowee = useSelector(store => store.selectedFollowee);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFollowees) {
      console.log('sf.id:', selectedFollowee.id, "user.id:", user.id);
      dispatch( {type: 'FETCH_FOLLOWEE_GOALS', payload: { followee_id: selectedFollowee.id, follower_id: user.id } })
    }
    else {
      dispatch( {type: 'UNSET_SELECTED_GOAL', payload: {} });
      dispatch( {type: 'FETCH_GOALS', payload: user.id });
      dispatch( {type: 'FETCH_PLANT_AVATARS' });
    } 
  }, []);

  const setSelectedGoal = (goal) =>{
    dispatch( {type: 'SET_SELECTED_GOAL', payload: goal});
  }

  const addNewGoal = () => {
    dispatch({ type: 'ADD_GOAL', payload: {
        goal_name: '',
        progress: 0,
        is_accomplished: false,
        user_id: user.id,
        plant_avatar_id: 1,
        visibility: "private"
    }});
    //note that ADD_GOAL sequence ends with SET_SELECTED_GOAL for the new goal
  }

  const getRand = () => {
    return Math.floor(Math.random() * 10000);
  }

  return (
    <div className="container">
      <h2 className="pageTitle">
            { isFollowees ? selectedFollowee.username + "'s Goals" : 'Goals'}
      </h2> 

      { isFollowees 
        ? <></> 
        : <div className="centerFlexContainer">
            <Link to="/new-goal" onClick={addNewGoal}>
              <Button className="iconButton">
                <img className="iconImage iconImageXL" src='./images/icons/AddIcon.png' alt="Add goal"></img>
              </Button> 
            </Link>
          </div>
      }


      <div className="cards">
        {goals.map(goal => {
          return (
            <div className="cardAreaSmall" key={uuidv4()}> 
            {/* //key={goal.id}>  */}
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
        })}
      </div>  

    </div>
  );
}

export default GoalsPage;
