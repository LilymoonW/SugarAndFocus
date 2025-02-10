import React from 'react';

function MainPage() {
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
          <img
            src="assets/sleepingCat.gif"
            alt="cat"
            className="bottom-item"
            style={{ height: '330px', width: '330px', imageRendering: 'pixelated' }}
          />
          <button className="brown-button" id="focus-button">Focus</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;