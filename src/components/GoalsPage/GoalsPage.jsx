import React from 'react';
import { Link } from 'react-router-dom';

function GoalsPage() {
  return (
    <div className="container">
      <h2>Goals Page</h2>

      <Link to="/new-goal">
        <button>Add New Goal</button>
      </Link>

      <Link to="/goal">
        <button>View This Existing Goal</button>
      </Link>


    </div>
  );
}

export default GoalsPage;
