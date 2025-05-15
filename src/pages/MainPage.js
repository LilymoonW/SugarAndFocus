import React, { useState } from 'react';
import sleepingCat from '../components/sleepingCat.gif';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const [time, setTime] = useState("25:00");
  const [showOverlay, setShowOverlay] = useState(false);
  const [tempHour, setTempHour] = useState(25);
  const [tempMinute, setTempMinute] = useState(0);

  const handleTimeClick = () => setShowOverlay(true);

  const handleConfirm = () => {
    const formattedTime = `${String(tempHour).padStart(2, '0')}:${String(tempMinute).padStart(2, '0')}`;
    setTime(formattedTime);
    setShowOverlay(false);
  };

  return (
    <div className="page">
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
            <h1 className="time" onClick={handleTimeClick}>{time}</h1>

            {showOverlay && (
              <div className="overlay">
                <div className="modal">
                  <h2>Select Time</h2>
                  <div className="picker">
                    <div className="picker-column">
                      <label>Hours</label>
                      <select
                        size="5"
                        value={tempHour}
                        onChange={(e) => setTempHour(+e.target.value)}
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={i}>
                            {String(i).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="picker-column">
                      <label>Minutes</label>
                      <select
                        size="5"
                        value={tempMinute}
                        onChange={(e) => setTempMinute(+e.target.value)}
                      >
                        {Array.from({ length: 60 }, (_, i) => (
                          <option key={i} value={i}>
                            {String(i).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button onClick={handleConfirm}>Confirm</button>
                  <button onClick={() => setShowOverlay(false)} className="cancel">Cancel</button>
                </div>
              </div>
            )}

            <img
              src={sleepingCat}
              alt="cat"
              className="bottom-item"
              style={{ height: '230px', width: '230px', imageRendering: 'pixelated' }}
            />
          </div>

          <button className="brown-button" id="focus-button" onClick={() => navigate('/')}>
            Focus
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
