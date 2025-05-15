import React, { useState, useEffect } from "react";
import sleepingCat from "../components/sleepingCat.gif";
import sittingCat from "../components/sittingCat.gif";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

function MainPage() {
  const navigate = useNavigate();

  const [time, setTime] = useState("25:00");
  const [showOverlay, setShowOverlay] = useState(false);
  const [tempHour, setTempHour] = useState(0);
  const [tempMinute, setTempMinute] = useState(25);
  const [isCounting, setIsCounting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(1500);

  // Format time display conditionally
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h:${String(minutes).padStart(2, "0")}`;
    } else {
      return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
        2,
        "0"
      )}`;
    }
  };

  // Countdown logic
  useEffect(() => {
    let timer;
    if (isCounting && !isPaused && remainingSeconds > 0) {
      timer = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    }
    if (remainingSeconds === 0) {
      setIsCounting(false);
    }

    return () => clearInterval(timer);
  }, [isCounting, isPaused, remainingSeconds]);

  const handleTimeClick = () => {
    if (!isCounting) {
      setShowOverlay(true);
    }
  };



  const handleConfirm = () => {
    const totalSeconds = tempHour * 3600 + tempMinute * 60;
    setRemainingSeconds(totalSeconds);

    // Format time according to rule
    const displayTime =
      tempHour > 0
        ? `${tempHour}h:${String(tempMinute).padStart(2, "0")}`
        : `${String(tempMinute).padStart(2, "0")}:00`;

    setTime(displayTime);
    setShowOverlay(false);
  };
  const handleStop = () => {
    setIsCounting(false);
    setIsPaused(false);
    setRemainingSeconds(0);
  };

  const handleFocusClick = () => {
    setIsCounting(true);
    setIsPaused(false);
  };


  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    <div className="page">
      <Header />

      <div className="text-body">
        Start a study timer and Bake some sweets (˶˃ ᵕ ˂˶)
        <div className="container">
          <div className="cat-stack">
            <h1
              className={`time ${isCounting ? "disabled" : ""}`}
              onClick={handleTimeClick}
              style={{ cursor: isCounting ? "default" : "pointer" }}
            >
              {isCounting ? formatTime(remainingSeconds) : time}
            </h1>

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
                            {String(i).padStart(2, "0")}
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
                            {String(i).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button onClick={handleConfirm}>Confirm</button>
                  <button
                    onClick={() => setShowOverlay(false)}
                    className="cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <img
              src={isCounting ? sittingCat : sleepingCat}
              alt="cat"
              className="bottom-item"
              style={{
                height: "230px",
                width: "230px",
                imageRendering: "pixelated",
              }}
            />
          </div>

          {!isCounting && (
            <button
              className="brown-button"
              id="focus-button"
              onClick={handleFocusClick}
            >
              Focus
            </button>
          )}

          {isCounting && (
            <div className="control-buttons">
              {!isPaused ? (
                <>
                <button onClick={handleStop}>Stop</button>
                <button onClick={handlePause}>Paws</button>
                </>
          
                
              ) : (
                <>
                  <button onClick={handleStop}>Stop</button>
                  <button onClick={handleResume}>Resume</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
