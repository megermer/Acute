import "./App.css";
import * as React from "react";
import { useState, useEffect } from "react";
import data from "../src/data.json";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";

function App() {
  // Selecting the algorithm with the radio btns
  const [selectedValue, setSelectedValue] = useState(0);

  // Display SM2 btns
  const [displayBtns, setDisplayBtns] = useState(() => {
    const savedAlgorithm = localStorage.getItem("pickAlgorithm");
    return savedAlgorithm ? JSON.parse(savedAlgorithm) : false;
  });

  // Will display the SM2 or AI influenced interface
  const [pickAlgorithm, setPickAlgorithm] = useState(() => {
    const savedAlgorithm = localStorage.getItem("pickAlgorithm");
    return savedAlgorithm ? JSON.parse(savedAlgorithm) : 0;
  });

  const [cardIndex, setCardIndex] = useState(() => {
    const savedIndex = localStorage.getItem("cardIndex");
    return savedIndex ? JSON.parse(savedIndex) : 0;
  });

  // User answer input
  const [inputValue, setInputValue] = useState(() => {
    return localStorage.getItem("inputValue") || "";
  });

  // Whether the answer card is displayed
  const [displayingAnswer, setDisplayingAnswer] = useState(() => {
    const savedDisplay = localStorage.getItem("displayingAnswer");
    return savedDisplay ? JSON.parse(savedDisplay) : false;
  });

  // The basic card info that is shown on both cards
  const [displayedCard, setDisplayedCard] = useState(() => {
    const savedCard = localStorage.getItem("displayedCard");
    return savedCard
      ? JSON.parse(savedCard)
      : {
          question:
            `Questions will be displayed in this box. What color is the inside of a watermelon before its cut? Once you've typed the answer, hit "Show"`,
          answer: "Blue of course! Click Next to view the remaining questions!",
        };
  });

  // If the page is refreshed
  useEffect(() => {
    localStorage.setItem("cardIndex", JSON.stringify(cardIndex));
    localStorage.setItem("inputValue", inputValue);
    localStorage.setItem("displayingAnswer", JSON.stringify(displayingAnswer));
    localStorage.setItem("displayedCard", JSON.stringify(displayedCard));
    localStorage.setItem("pickAlgorithm", JSON.stringify(pickAlgorithm));
  }, [cardIndex, inputValue, displayingAnswer, displayedCard, pickAlgorithm]);

  // handleChange for input answer
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // handleChange for radio btn
  const handleChangeRadio = (event) => {
    console.log(event.target.value);

    // Converting to integer then assigning
    setSelectedValue(parseInt(event.target.value, 10));
  };

  /* In charge of showing next card
    Will not show next card if input box is empty
  */
  const displayCards = () => {
    if (!inputValue && pickAlgorithm === 2) {
      return;
    }

    console.log(`inputValue: ${inputValue}`);
    if (cardIndex < 5) {
      setDisplayedCard(data[cardIndex]);
      setCardIndex((prevState) => prevState + 1);
      setInputValue("");

      setDisplayingAnswer(false);

      if (pickAlgorithm === 1) {
        setDisplayingAnswer((prevState) => !prevState);
        displayAnswerSM2()
      }
    } else {
      alert("You've completed your study cards!");
    }
  };

  // Will display answer only when input box is not empty
  const displayAnswer = () => {
    if (inputValue) {
      setDisplayingAnswer((prevState) => !prevState);
    }

    console.log(inputValue);
  };

  const displayAnswerSM2 = () => {
    setDisplayingAnswer((prevState) => !prevState);

    setDisplayBtns((prevState) => !prevState);

    console.log(inputValue);
  };

  // Once btn is pushed, the right template will be shown
  const displayTemplate = () => {
    setPickAlgorithm(selectedValue);
    console.log("Template picked:", selectedValue);
  };

  // Radio btn controls
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChangeRadio,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <div id="root-page">
      {pickAlgorithm === 2 ? (
        <section id="cards-cont">
          {console.log("pickAlgorithm value:", pickAlgorithm)}
          <div className="card" id="question-card">
            <p className="card-title">Question</p>
            <p className="card-content">{displayedCard.question}</p>
            <TextField
              id="answer-input"
              label="Answer"
              variant="outlined"
              multiline
              maxRows={1}
              value={inputValue}
              onChange={handleChange}
              sx={{ width: "75%", height: "25%", m: "0px", p: "0px" }}
            />
          </div>
          <div
            className="card"
            id="answer-card"
            style={{ visibility: displayingAnswer ? "visible" : "hidden" }}
          >
            <p className="card-title">Answer</p>
            <p className="card-content">{displayedCard.answer}</p>
          </div>
          <Stack direction="row" spacing={2} id="buttons">
            <Button
              variant="contained"
              color="success"
              onClick={displayAnswer}
              sx={{ bgcolor: "#1976d2" }}
            >
              {displayingAnswer ? "Hide" : "Show"}
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={displayCards}
              sx={{ bgcolor: "#1976d2" }}
            >
              Next
            </Button>
          </Stack>
        </section>
      ) : pickAlgorithm === 1 ? (
        <section id="cards-cont">
          {console.log("pickAlgorithm value:", pickAlgorithm)}
          <div className="card" id="question-card">
            <p className="card-title">Question</p>
            <p className="card-content">{displayedCard.question}</p>
          </div>
          <div
            className="card"
            id="answer-card"
            style={{ visibility: displayingAnswer ? "visible" : "hidden" }}
          >
            <p className="card-title">Answer</p>
            <p className="card-content">{displayedCard.answer}</p>
          </div>
          <Stack direction="row" spacing={2} id="buttons-sm2">
            {displayBtns === true ? (
              <Stack direction="row" spacing={2} id="sm2-btns">
                <Button
                  variant="contained"
                  color="success"
                  onClick={displayCards}
                  sx={{ bgcolor: "#1976d2" }}
                >
                  Impossible
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={displayCards}
                  sx={{ bgcolor: "#1976d2" }}
                >
                  Hard
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={displayCards}
                  sx={{ bgcolor: "#1976d2" }}
                >
                  Normal
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={displayCards}
                  sx={{ bgcolor: "#1976d2" }}
                >
                  Easy
                </Button>
              </Stack>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={displayAnswerSM2}
                sx={{ bgcolor: "#1976d2" }}
              >
                {displayingAnswer ? "Hide" : "Show"}
              </Button>
            )}
          </Stack>
        </section>
      ) : (
        <section id="pick-algorithm">
          <div>{console.log("pickAlgorithm value:", pickAlgorithm)}</div>
          <p id="ai-title">Select your Template</p>
          <div>
            <p>SM2</p>
            <Radio
              {...controlProps(1)}
              color="secondary"
              sx={{ p: "0px", m: "0px" }}
            />
          </div>
          <div>
            <p>AI + SM2</p>
            <Radio
              {...controlProps(2)}
              color="success"
              sx={{ p: "0px", m: "0px" }}
            />
          </div>
          <div id="btn-cont">
            <Button
              variant="contained"
              color="success"
              onClick={displayTemplate}
              sx={{ bgcolor: "#1976d2", width: "30%" }}
            >
              Confirm
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
