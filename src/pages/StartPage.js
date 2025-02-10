import React from 'react';

function StartPage() {
  return (
    <div>
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
              src="assets/menu.png"
              alt="cat"
              className="overlay"
              style={{ height: '110px', width: 'auto', imageRendering: 'pixelated' }}
            />
            <img
              src="assets/sittingCat.gif"
              alt="cat"
              className="bottom-item"
              style={{ height: '340px', width: '340px', imageRendering: 'pixelated' }}
            />
          </div>
          <button className="brown-button" id="start-button">Start</button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;