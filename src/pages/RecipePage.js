import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import { useAppStore } from '../store.ts';
import { useNavigate } from 'react-router-dom';

function RecipePage() {
  const sessions = useAppStore((state) => state.sessions);
  const selectedIndex = useAppStore((state) => state.selectedSessionIndex);
  const latestSession =
    selectedIndex !== null && sessions[selectedIndex]
      ? sessions[selectedIndex]
      : sessions[sessions.length - 1] || null;
    // Text fitting logic (same as before)
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(64);
  const horizontalPadding = 5;

  useEffect(() => {
    const fitText = () => {
      const container = containerRef.current;
      const textEl = textRef.current;
      if (!container || !textEl) return;

      textEl.style.visibility = 'hidden';
      textEl.style.display = 'inline-block';
      const availableWidth = container.offsetWidth - (horizontalPadding * 2);

      let min = 1;
      let max = 28;
      let size = 24;
      let foundSize = size;

      while (min <= max) {
        size = Math.floor((min + max) / 2);
        textEl.style.fontSize = `${size}px`;
        
        if (textEl.scrollWidth > availableWidth) {
          max = size - 1;
        } else {
          min = size + 1;
          foundSize = size;
        }
      }

      setFontSize(foundSize);
      textEl.style.visibility = 'visible';
    };

    const resizeObserver = new ResizeObserver(fitText);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    fitText();
    return () => resizeObserver.disconnect();
  }, [horizontalPadding, latestSession?.recipe]); // Add dependency on recipe name

  const navigate = useNavigate();

  if (!latestSession) {
    return (
      <div className="page">
        <Header />
        <div className="text-body">
          No study sessions found. Bake something first! (˶˃ ᵕ ˂˶)
        </div>
      </div>
    );
  }

  // Format the date nicely
  const formattedDate = new Date(latestSession.date).toLocaleDateString();
  // Format duration (stored in minutes in the session)
  const durationHours = Math.floor(latestSession.focusDuration / 60);
  const durationMinutes = latestSession.focusDuration % 60;
  const formattedDuration = `${durationHours > 0 ? `${durationHours}h ` : ''}${durationMinutes}m`;

  return (
    <div className="page">
      <Header />
      <div className="text-body">
        Start a study timer and Bake some sweets (˶˃ ᵕ ˂˶)
                </div>

        <div className="container" ref={containerRef}>
          <div
            ref={textRef}
            className="food-text"
            style={{
              fontSize: `${fontSize}px`,
              padding: `0 ${horizontalPadding}px`
            }}
          >
            {latestSession.recipe}
          </div>
          <img
            src={latestSession.image}
            alt={latestSession.recipe}
            className="food"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="food-text">
            You focused for {formattedDuration} on {formattedDate}
          </div>
          <div className="control-buttons">
            <button onClick={() => navigate('/main')}>Home</button>
            <button onClick={() => navigate('/menu')}>Menu</button>
          </div>
      </div>
    </div>
  );
}

export default RecipePage;