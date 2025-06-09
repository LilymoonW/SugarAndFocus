import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import sittingCat from '../components/sittingCat.gif';
import menu from '../components/menu.png';


function StartPage() {

    const navigate = useNavigate();  // Hook for programmatic navigation
      const handleFocusClick = () => {
      navigate('/main');  // Navigate to /start page
    };
    
    const handleMinimize = () => {
  if (window.electronAPI?.minimize) {
    window.electronAPI.minimize();
  } else {
    console.error('electronAPI not found');
  }
};

const handleQuitClick = () => {
  if (window.electronAPI?.quitApp) {
    window.electronAPI.quitApp();
  } else {
    console.error('electronAPI not found');
  }
};

  return (
    <div className ="page">
 
      <Header />
      <div className="text-body">
        Start a study timer and Bake some sweets (˶˃ ᵕ ˂˶)
                </div>
        <div className="container">

          <div className="cat-stack">
            <img
              src={menu}
              alt="cat"
              id ="menu"
              style={{ height: '75px', width: 'auto', imageRendering: 'pixelated' }}
              onClick={
                () => {
                  navigate('/menu');                 
              }
            }
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
  );
}

export default StartPage;