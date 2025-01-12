import React from "react";
import Cards from "./components/Cards";
import "./global.css";

function App() {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <h1> Memory Game </h1>
      <button className="start-over-button" onClick={refreshPage}>
       ↻ Restart 
      </button>
      <p className="description">
        Flip two cards to find a matching pair. If the cards match, they will
        remain flipped. If they don't, they will flip back after a short delay.
        Try to match all pairs in the least amount of moves. Good luck!
      </p>
      <Cards />
    </div>
  );
}

export default App;
