import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAppStore } from "../store.ts";
import "../Menu.css";

const MenuPage = () => {
  const sessions = useAppStore((state) => state.sessions);
  const setSelectedSessionIndex = useAppStore((state) => state.setSelectedSessionIndex);

  const navigate = useNavigate();

  return (
    <div className="page">
      <Header />
      <div className="text-body">
        Start a study timer and Bake some sweets (˶˃ ᵕ ˂˶)
      </div>
      <div className="container">
        <div className="container-grid">
          {[...sessions].reverse().map((session, index) => {
            const actualIndex = sessions.length - 1 - index;
            return (
              <div
                key={actualIndex}
                className="session-card"
                onClick={() => {
                  setSelectedSessionIndex(actualIndex);
                  navigate("/recipe");
                }}
              >
                <div className="session-info">
                  <p>{new Date(session.date).toLocaleDateString()}</p>
                </div>
                <img src={session.image} alt={session.recipe} />
              </div>
            );
          })}
        </div>
        <button className="add-button" onClick={() => navigate("/main")}>+</button>
      </div>
    </div>
  );
};

export default MenuPage;
