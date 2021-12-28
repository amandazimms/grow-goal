import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import GoalItem from '../GoalItem/GoalItem';

function GoalsPage(props) {
  //if we reach this page via social, it will trigger 'isFollowees=true', meaning we are looking at a followee's page
  const isFollowees = props.isFollowees;

  const goals = useSelector(store => isFollowees ? store.followeeGoals : store.goal);
  const user = useSelector((store) => store.user);
  const selectedFollowee = useSelector(store => store.selectedFollowee);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFollowees) {
      dispatch( {type: 'FETCH_FOLLOWEE_GOALS', payload: { followee_id: selectedFollowee.id, follower_id: user.id } })
    }
    else {
      dispatch( {type: 'UNSET_SELECTED_GOAL', payload: {} });
      dispatch( {type: 'FETCH_GOALS', payload: user.id });
      dispatch( {type: 'FETCH_PLANT_AVATARS' });
    } 
  }, []);

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
        {goals.map(goal => (
            <GoalItem goal={goal} isFollowees={isFollowees} key={uuidv4()}/>
        ))}
      </div>  

    </div>
  );
}

export default GoalsPage;
