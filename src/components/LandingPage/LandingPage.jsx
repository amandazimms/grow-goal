import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Button } from 'react-bootstrap';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <div className="cards cardsColumn">
        
          <RegisterForm />

          <div className="cardArea cardFitContent">
            <center>
              <h4>Already a Member?</h4>
              <Button className="buttonButton" onClick={onLogin}>
                Log In
              </Button>
            </center>
          </div>
        
      </div>
    </div>
  );
}

export default LandingPage;
