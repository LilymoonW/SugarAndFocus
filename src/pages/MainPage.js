import React, { useState, useEffect, useRef } from "react";
import sleepingCat from "../components/sleepingCat.gif";
import sittingCat from "../components/sittingCat.gif";
import menu from "../components/menu.png";
import coinIcon from "../components/coin.png";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAppStore } from "../store.ts";

// 💰 CoinDisplay Component
function CoinDisplay({ coinCount, onClick }) {
  const roundedCoins = Math.round(coinCount);
  return (
    <div
      className="coin-display"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img src={coinIcon} alt="Coin" className="coin-icon" />
      <span>{roundedCoins}</span>
    </div>
  );
}

// 🐱 MainPage Component
function MainPage() {
  const navigate = useNavigate();
  const hasAddedSession = useRef(false);

  const sessions = useAppStore((state) => state.sessions);
  const addSession = useAppStore((state) => state.addSession);
  const selectedRecipe = useAppStore((state) => state.selectedRecipe);
  const availableRecipes = useAppStore((state) => state.availableRecipes);
  const ownedRecipes = useAppStore((state) => state.ownedRecipes);

  const coins = useAppStore((state) => state.coins);
  const setCoins = useAppStore((state) => state.setCoins);
  const setSelectedSessionIndex = useAppStore(
    (state) => state.setSelectedSessionIndex
  );
  const setSelectedRecipe = useAppStore((state) => state.changeSelectedRecipe);
  const buyRecipe = useAppStore((state) => state.buyRecipe);

  const [time, setTime] = useState("25:00");
  const [showOverlay, setShowOverlay] = useState(false);
  const [showRecipeOverlay, setShowRecipeOverlay] = useState(false);
  const [showPurchaseOverlay, setShowPurchaseOverlay] = useState(false);
  const [tempHour, setTempHour] = useState(0);
  const [tempMinute, setTempMinute] = useState(25);
  const [isCounting, setIsCounting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(1500);
  const [failedPurchase, setFailedPurchase] = useState({});

  const [shouldNavigate, setShouldNavigate] = useState(false);
  const didNavigate = useRef(false);

  const handleAddCoins = (num) => {
    setCoins(coins + num);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hours > 0
      ? `${hours}h:${String(minutes).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;
    if (isCounting && !isPaused && remainingSeconds > 0) {
      timer = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCounting, isPaused, remainingSeconds]);

  useEffect(() => {
    if (
      remainingSeconds === 0 &&
      isCounting &&
      !hasAddedSession.current &&
      !isStopped
    ) {
      const focusDuration = tempHour * 60 + tempMinute;
      const recipeInfo = availableRecipes.find(
        (r) => r.name === selectedRecipe
      );

      hasAddedSession.current = true;

      addSession({
        recipe: selectedRecipe,
        focusDuration,
        completed: true,
        date: new Date().toISOString(),
        image: recipeInfo ? recipeInfo.image : null,
      });

      handleAddCoins(focusDuration / 10);
      setIsCounting(false);
      setIsStopped(false);
      setShouldNavigate(true);
    }
  }, [
    remainingSeconds,
    isCounting,
    isStopped,
    selectedRecipe,
    tempHour,
    tempMinute,
    availableRecipes,
    addSession,
  ]);

  useEffect(() => {
    if (shouldNavigate && !didNavigate.current) {
      didNavigate.current = true;
      setTimeout(() => {
        const latestIndex = sessions.length - 1;
        setSelectedSessionIndex(latestIndex);
        setShouldNavigate(false);
        hasAddedSession.current = false;
        navigate("/recipe");
      }, 0);
    }
  }, [shouldNavigate, sessions.length, navigate, setSelectedSessionIndex]);

  const handleTimeClick = () => {
    if (!isCounting) setShowOverlay(true);
  };

  const handleConfirm = () => {
    const totalSeconds = tempHour * 3600 + tempMinute * 60;
    setRemainingSeconds(totalSeconds);
    setTime(
      tempHour > 0
        ? `${tempHour}h:${String(tempMinute).padStart(2, "0")}`
        : `${String(tempMinute).padStart(2, "0")}:00`
    );
    setShowOverlay(false);
    setIsStopped(false);
  };

  const handleStop = () => {
    setIsCounting(false);
    setIsPaused(false);
    setRemainingSeconds(0);
    setIsStopped(true);
  };

  const handleFocusClick = () => {
    setRemainingSeconds(tempHour * 3600 + tempMinute * 60);
    setIsCounting(true);
    setIsPaused(false);
    setIsStopped(false);
    didNavigate.current = false;
    hasAddedSession.current = false;
  };

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  const handleSelectItem = () => {
    if (!isCounting) {
      setShowRecipeOverlay(true);
    }
  };

  return (
    <div className="page">
      <Header />
      <div className="text-body">
        Start a study timer and Bake some sweets (˶˃ ᵕ ˂˶)
      </div>
      <div className="container">
        <CoinDisplay
          coinCount={coins}
          onClick={() => setShowPurchaseOverlay(true)}
        />

        {!isCounting && (
          <img
            src={menu}
            alt="menu"
            id="menu2"
            style={{
              height: "50px",
              width: "auto",
              imageRendering: "pixelated",
            }}
            onClick={() => {
              navigate("/menu");
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

          {/* Time Picker Overlay */}
          {showOverlay && (
            <div className="overlay">
              <div className="modal">
                <h1>Select Time</h1>
                <div className="picker">
                  <div className="picker-column">
                    <label>Hours</label>
                    <select
                      value={tempHour}
                      size="5"
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
                      value={tempMinute}
                      size="5"
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
                    className="cancel"
                    onClick={() => setShowOverlay(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Recipe Selection Overlay */}
          {showRecipeOverlay && (
            <div className="overlay">
              <div className="modal">
                <h1>Select a Recipe</h1>
                <div className="recipe-grid">
                  {ownedRecipes.map((recipeName) => {
                    const recipe = availableRecipes.find(
                      (r) => r.name === recipeName
                    );
                    if (!recipe) return null;
                    return (
                      <div
                        key={recipe.name}
                        className={`recipe-card ${
                          selectedRecipe === recipe.name ? "selected" : ""
                        }`}
                        onClick={() => {
                          setSelectedRecipe(recipe.name);
                          setShowRecipeOverlay(false);
                        }}
                      >
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="recipe-img"
                        />
                        <p className="recipe-name">{recipe.name}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="control-buttons">
                  <button
                    className="cancel"
                    onClick={() => setShowRecipeOverlay(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showPurchaseOverlay && (
            <div className="overlay">
              <div className="modal">
                <h1 className="modal-title">Purchase Recipes</h1>

                <div className="modal-content">
                  {availableRecipes.filter(
                    (r) => !ownedRecipes.includes(r.name)
                  ).length === 0 ? (
                    <p className="no-recipes-msg">
                      No recipes to purchase, check back for updates!
                    </p>
                  ) : (
                    <div className="recipe-grid">
                      {availableRecipes
                        .filter((r) => !ownedRecipes.includes(r.name))
                        .map((recipe) => (
<div key={recipe.name} className="recipe-wrapper">
  <div className="recipe-card">
    <img src={recipe.image} alt={recipe.name} className="recipe-img" />
    <p className="recipe-name">{recipe.name}</p>
  </div>
  <button
    className={`purchase-button ${
      failedPurchase[recipe.name] ? "purchase-failed" : ""
    }`}
    onClick={() => {
      const success = buyRecipe(recipe);
      if (!success) {
        setFailedPurchase((prev) => ({ ...prev, [recipe.name]: true }));
        setTimeout(() => {
          setFailedPurchase((prev) => ({ ...prev, [recipe.name]: false }));
        }, 1500);
      } else {
        setCoins(useAppStore.getState().coins);
      }
    }}
  >
    {recipe.cost} coins
  </button>
</div>


                        ))}
                    </div>
                  )}
                </div>

                <div className="control-buttons">
                  <button
                    className="cancel"
                    onClick={() => setShowPurchaseOverlay(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <img
            src={isCounting ? sittingCat : sleepingCat}
            alt="cat"
            className="bottom-item"
            onClick={handleSelectItem}
            style={{
              height: "230px",
              width: "230px",
              imageRendering: "pixelated",
              cursor: isCounting ? "default" : "pointer",
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
  );
}

export default MainPage;
