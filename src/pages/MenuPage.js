import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useAppStore } from "../store.ts";
import "../Menu.css";

const MenuPage = () => {
  const sessions = useAppStore((state) => state.sessions);

  return (
    <div className="page">
      <Header />
      <div className="text-body">
        Start a study timer and Bake some sweets (˶˃ ᵕ ˂˶)
        <div className="container">
          <div className="container-grid">
            {sessions.map((session, index) => (
              <div key={index} className="session-card">
                <img src={session.image} alt={session.recipe} />
                <div className="session-info">
                  <p>{new Date(session.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="add-button">+</button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
