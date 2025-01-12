import React, { useState } from "react";
import Card from "./Card";

const generateShuffledCards = () => {
  const cards = [
    { id: 1, img: "/assets/cat-1.png", stat: "" },
    { id: 1, img: "/assets/cat-1.png", stat: "" },
    { id: 2, img: "/assets/cat-2.png", stat: "" },
    { id: 2, img: "/assets/cat-2.png", stat: "" },
    { id: 3, img: "/assets/cat-3.png", stat: "" },
    { id: 3, img: "/assets/cat-3.png", stat: "" },
    { id: 4, img: "/assets/cat-4.png", stat: "" },
    { id: 4, img: "/assets/cat-4.png", stat: "" },
    { id: 5, img: "/assets/cat-5.png", stat: "" },
    { id: 5, img: "/assets/cat-5.png", stat: "" },
    { id: 6, img: "/assets/cat-6.png", stat: "" },
    { id: 6, img: "/assets/cat-6.png", stat: "" },
    { id: 7, img: "/assets/cat-7.png", stat: "" },
    { id: 7, img: "/assets/cat-7.png", stat: "" },
    { id: 8, img: "/assets/cat-8.png", stat: "" },
    { id: 8, img: "/assets/cat-8.png", stat: "" },
  ];

  return cards.sort(() => Math.random() - 0.5);
};

function Cards() {
  const [items, setItems] = useState(generateShuffledCards());
  const [prev, setPrev] = useState(-1);
  const [disableClick, setDisableClick] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const checkGameOver = () => {
    if (items.every((item) => item.stat === "correct")) {
      setGameOver(true);
    }
  };

  function checkEqual(current) {
    if (items[current].id === items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPrev(-1);
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setDisableClick(true);
      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setItems([...items]);
        setPrev(-1);
        setDisableClick(false);
      }, 1000);
    }
    setMoves((prevMoves) => prevMoves + 1);
    checkGameOver();
  }

  function handleClick(id) {
    if (
      disableClick ||
      items[id].stat === "active" ||
      items[id].stat === "correct"
    ) {
      return;
    }

    if (prev === -1) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      checkEqual(id);
    }
  }

  const playAgain = () => {
    setItems(generateShuffledCards());
    setPrev(-1);
    setMoves(0);
    setGameOver(false);
  };

  return (
    <div>
      <div className="moves-counter">
        <p>Moves: {moves}</p>
      </div>

      <button className="start-over-button" onClick={playAgain}>
        Start Over
      </button>

      <div className={`container ${gameOver ? "blurred" : ""}`}>
        {items.map((item, index) => (
          <Card key={index} item={item} id={index} handleClick={handleClick} />
        ))}
      </div>

      {gameOver && (
        <div className="modal">
          <div className="modal-content">
            <h2>Congratulations!</h2>
            <p>You finished in {moves} moves.</p>
            <button className="play-btn" onClick={playAgain}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
