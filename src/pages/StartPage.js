import React from 'react';
import { useNavigate } from 'react-router-dom';

import sittingCat from '../components/sittingCat.gif';
import menu from '../components/menu.png';


function StartPage() {

    const navigate = useNavigate();  // Hook for programmatic navigation
      const handleFocusClick = () => {
      navigate('/main');  // Navigate to /start page
    };

  return (
    <div className ="page">
      <div className="header">
        <h1 className="title">Sugar & Focus</h1>
        <div id="headerphotos"></div>
        <button id="photoButton">
          <img src="assets/minus.png" alt="Photo Icon" className="button-icon" />
        </button>
        <button id="photoButton">
          <img src="assets/x.png" alt="Photo Icon" className="button-icon" />
        </button>
      </div>
      <div className="text-body">
        Start a study timer and Bake some sweets (˶˃ ᵕ ˂˶)
        <div className="container">
          <div className="cat-stack">
            <img
              src={menu}
              alt="cat"
              id ="menu"
              style={{ height: '75px', width: 'auto', imageRendering: 'pixelated' }}
            />
            <img
              src={sittingCat}
              alt="cat"
              className="bottom-item"
              style={{ height: '230px', width: '230px', imageRendering: 'pixelated' }}
            />
          </div>
          <button className="brown-button" id="start-button" onClick={handleFocusClick} >Start</button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;