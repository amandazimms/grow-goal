import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function SocialPage() {
  const goals = useSelector((store) => store.goal);
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( {type: 'UNSET_SELECTED_GOAL', payload: {} });
    dispatch( {type: 'FETCH_GOALS', payload: user.id });
    dispatch({ type: 'FETCH_PLANT_AVATARS' });
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
        plant_avatar_id: 1
        //todo add userID
    }});
    //note that ADD_GOAL sequence ends with SET_SELECTED_GOAL for the new goal
  }

  return (
    <div className="container">
      <h2 className="pageTitle">SOCIAL</h2>

      <div className="centerFlexContainer">
        <Link to="/new-goal" onClick={addNewGoal}>
          <Button className="iconButton">
            <img className="iconImage iconImageXL" src='./images/icons/AddIcon.png' alt="Add goal"></img>
          </Button> 
        </Link>
      </div>  


      <div className="cards">
        {goals.map(goal => {
          return (
            <div className="cardAreaSmall" key={goal.id}>              
              <Link to="/goal" onClick={() => setSelectedGoal(goal)}>
                <Button className="thumbnailButton">
                  <img className="plantAvatarThumbnail" src={goal.current_avatar_path} alt={goal.current_avatar_path}/>
                </Button>
              </Link>
              <h3 className="thumbnailGoalTitle">{goal.goal_name}</h3>
            </div>
            );
        })}
      </div>  

    </div>
  );
}

export default SocialPage;
