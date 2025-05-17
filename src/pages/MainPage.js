import React, { useState, useEffect } from "react";
import sleepingCat from "../components/sleepingCat.gif";
import sittingCat from "../components/sittingCat.gif";
import menu from "../components/menu.png";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAppStore } from "../store.ts";

function MainPage() {
  const navigate = useNavigate();
  const sessions = useAppStore((state) => state.sessions);
  const addSession = useAppStore((state) => state.addSession);
  const selectedRecipe = useAppStore((state) => state.selectedRecipe);
  const availableRecipes = useAppStore((state) => state.availableRecipes);
  const coins = useAppStore((state) => state.coins);
  const setCoins = useAppStore((state) => state.setCoins);

  const handleAddCoins = (num) => {
    setCoins(coins + num);
  };

  const [time, setTime] = useState("25:00");
  const [showOverlay, setShowOverlay] = useState(false);
  const [tempHour, setTempHour] = useState(0);
  const [tempMinute, setTempMinute] = useState(25);
  const [isCounting, setIsCounting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(1500);

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

  useEffect(() => {
    if (remainingSeconds === 0 && isCounting) {
      const focusDuration = tempHour * 60 + tempMinute; // in minutes

      const recipeInfo = availableRecipes.find(
        (r) => r.name === selectedRecipe
      );

      addSession({
        recipe: selectedRecipe,
        focusDuration: focusDuration,
        completed: true,
        date: new Date().toISOString(),
        image: recipeInfo ? recipeInfo.image : null,
      });

      handleAddCoins((tempHour * 60 + tempMinute) / 10);
      setIsCounting(false);
      const latestIndex = sessions.length - 1;

       navigate(`/recipe`);
      
      console.log("Session added:" + selectedRecipe + " " + focusDuration + " minutes" + " " + new Date().toISOString() + " " + recipeInfo.image);
    }
  }, [
    remainingSeconds,
    isCounting,
    selectedRecipe,
    addSession,
    tempHour,
    tempMinute,
    navigate,
    availableRecipes
  ]);

  const handleConfirm = () => {
    const totalSeconds = tempHour * 3600 + tempMinute * 60;
    setRemainingSeconds(totalSeconds);

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

  const handleSelectItem = () => {};

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    <div className="page">
      <Header />

      <div className="text-body">
        Start a study timer and Bake some sweets (˶˃ ᵕ ˂˶)
        <div className="container">
          <p style={{ position: "absolute", top: 0, left: 10 }}>
            Coins: {coins}
          </p>
          {!isCounting && (
            <img
              src={menu}
              alt="cat"
              id="menu2"
              style={{
                height: "50px",
                width: "auto",
                imageRendering: "pixelated",
              }}
            />
          )}
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
                  <h1>Select Time</h1>
                  <div className="picker">
                    <div className="picker-column">
                      <label>Hours</label>
                      <select
                        size="5"
                        value={tempHour}
                        onChange={(e) => setTempHour(+e.target.value)}
                      >
                        {Array.from({ length: 10 }, (_, i) => (
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
                  <div className="control-buttons">
                    <button onClick={handleConfirm}>Confirm</button>
                    <button
                      onClick={() => setShowOverlay(false)}
                      className="cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <img
              src={isCounting ? sittingCat : sleepingCat}
              alt="cat"
              className="bottom-item"
              id={isCounting ? undefined : "SleepingCat"}
              onClick={isCounting ? handleSelectItem : undefined}
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