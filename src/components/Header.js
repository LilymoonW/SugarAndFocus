import React from "react";

function Header() {
  const handleMinimize = () => {
    if (window.electronAPI?.minimize) {
      window.electronAPI.minimize();
    } else {
      console.error("electronAPI not found");
    }
  };

  const handleQuitClick = () => {
    if (window.electronAPI?.quitApp) {
      window.electronAPI.quitApp();
    } else {
      console.error("electronAPI not found");
    }
  };
  return (
    <div className="header">
      <h1 className="title">Sugar & Focus</h1>
      <div id="headerphotos"></div>
      <button id="photoButton" onClick={handleMinimize}>
        <img
          src="assets/minus.png"
          alt="Minimize Icon"
          className="button-icon"
        />
      </button>
      <button id="photoButton" onClick={handleQuitClick}>
        <img src="assets/x.png" alt="Close Icon" className="button-icon" />
      </button>
    </div>
  );
}

export default Header;
