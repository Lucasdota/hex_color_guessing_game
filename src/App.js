import './App.css';
import React, { useEffect, useState } from "react";

const colorCode = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

const App = () => {
  const [color1, setColor1] = useState();
  const [color2, setColor2] = useState();
  const [color3, setColor3] = useState();
  const [answer, setAnswer] = useState();
  const [shuffledNumbers, setShuffledNumbers] = useState([]);
  const [playAgainClicked, setPlayAgainClicked] = useState(false);
  

  useEffect(() => {
		const numbers = [1, 2, 3];

    // generate correct color
    let newHex = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 16);
      newHex = newHex.concat(colorCode[randomIndex]);
    }
    setColor1(newHex);

    // generate wrong color 1
    let newHex1 = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 16);
      newHex1 = newHex1.concat(colorCode[randomIndex]);
    }
    setColor2(newHex1);

    // generate wrong color 2
    let newHex2 = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 16);
      newHex2 = newHex2.concat(colorCode[randomIndex]);
    }
    setColor3(newHex2);

    // Shuffle the numbers array only on the first render
    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
      }
      return arr;
    };

    const shuffled = shuffleArray([...numbers]); // Spread to avoid mutating original array
    setShuffledNumbers(shuffled);
  }, [playAgainClicked]);

  const checkAnswer = (event) => {
    const divId = event.currentTarget.id;
    console.log(divId);
    if (divId === "color1") {
      setAnswer("Correct!");
    } else {
      setAnswer("Incorrect!");
    }
  };

  const playAgain = () => {
    setPlayAgainClicked((prev) => !prev);
    setAnswer(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Color Codes</h1>
      {/* Randomly generate the HEX below. */}
      <h2>{color1}</h2>
      <h2>What color is this?</h2>
      <div data-testid="color-container" style={{ display: "flex" }}>
        {shuffledNumbers.map((item) => {
          if (item === 1) {
            return (
              <div
                key="color1"
                onClick={checkAnswer}
                id="color1"
                data-testid="correct-color"
              >
                <div
                  style={{
                    background: color1,
                    height: "100px",
                    width: "100px",
                  }}
                ></div>
              </div>
            );
          } else if (item === 2) {
            return (
              <div
                key="color2"
                onClick={checkAnswer}
                id="color2"
                data-testid="incorrect-color"
              >
                <div
                  style={{
                    background: color2,
                    height: "100px",
                    width: "100px",
                  }}
                ></div>
              </div>
            );
          } else {
            return (
              <div
                key="color3"
                onClick={checkAnswer}
                id="color3"
                data-testid="incorrect-color"
              >
                <div
                  style={{
                    background: color3,
                    height: "100px",
                    width: "100px",
                  }}
                ></div>
              </div>
            );
          }
        })}
      </div>
      <p style={{ height: "30px" }}>{answer}</p>
      <button onClick={playAgain}>Play Again</button>
    </div>
  );
};

export default App;
