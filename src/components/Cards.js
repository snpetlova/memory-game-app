import React, { useState } from "react";
import Card from "./Card";
import cat1 from '../assets/cat-1.png';
import cat2 from '../assets/cat-2.png';
import cat3 from '../assets/cat-3.png';
import cat4 from '../assets/cat-4.png';
import cat5 from '../assets/cat-5.png';
import cat6 from '../assets/cat-6.png';
import cat7 from '../assets/cat-7.png';
import cat8 from '../assets/cat-8.png';

const generateShuffledCards = () => {
  const cards = [
    { id: 1, img: cat1, stat: "" },
    { id: 1, img: cat1, stat: "" },
    { id: 2, img: cat2, stat: "" },
    { id: 2, img: cat2, stat: "" },
    { id: 3, img: cat3, stat: "" },
    { id: 3, img: cat3, stat: "" },
    { id: 4, img: cat4, stat: "" },
    { id: 4, img: cat4, stat: "" },
    { id: 5, img: cat5, stat: "" },
    { id: 5, img: cat5, stat: "" },
    { id: 6, img: cat6, stat: "" },
    { id: 6, img: cat6, stat: "" },
    { id: 7, img: cat7, stat: "" },
    { id: 7, img: cat7, stat: "" },
    { id: 8, img: cat8, stat: "" },
    { id: 8, img: cat8, stat: "" },
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
      ↻ Restart
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
