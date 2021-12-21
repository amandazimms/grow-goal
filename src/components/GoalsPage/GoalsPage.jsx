import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function GoalsPage() {
  const goals = useSelector((store) => store.goal);
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    //todo - add payload for specific goals to this user
    dispatch( {type: 'FETCH_GOALS', payload: {user: user} } );
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
          <p>{JSON.stringify(user)}</p>

      {/* <h3>{JSON.stringify(goals)}</h3> */}
      <h2>Goals Page</h2>

      <Link to="/new-goal" onClick={addNewGoal}>
        <Button>Add New Goal</Button>
      </Link>


      {goals.map(goal => {
        return (
          <div key={goal.id}>
            {/* <p>{JSON.stringify(goal)}</p> */}
            <h3>{goal.goal_name}</h3>
            
            <Link to="/goal" onClick={() => setSelectedGoal(goal)}>
              <Button className="thumbnailButton">
                <img className="plantAvatarThumbnail" src={goal.current_avatar_path} alt={goal.current_avatar_path}/>
              </Button>
            </Link>
          </div>
          );
      })}

    </div>
  );
}

export default GoalsPage;
