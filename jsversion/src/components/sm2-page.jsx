import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Sm2Card } from "./card";

export const SM2 = ({ onData, cards }) => {
  const deck = cards;
  const [displayAnswer, setDisplayAnswer] = useState(false);

  const tutorialCard = {
    question: "SM2 This is a SM2 question card",
    answer: "SM2 This is a SM2 question card",
  };

  const sendDataToParent = (SM2Grade) => {
    // Tells App.jsx that current card has been reviewed
    let cardOver = true;
    onData(SM2Grade, cardOver);
    cardOver = false;
    setDisplayAnswer((prev) => !prev);
    // alert("Check comment in sendDataToParent() in sm2-page.jsx")
  };

  return (
    <section className="template-container">
      <Sm2Card card={deck[0]} displayAnswer={displayAnswer} />
      <Stack direction="row" spacing={2} id="buttons-sm2">
        {displayAnswer === true ? (
          <Stack direction="row" spacing={2} id="sm2-btns">
            <Button
              variant="contained"
              color="success"
              onClick={() => sendDataToParent(0)}
              sx={{ bgcolor: "#1976d2" }}
            >
              Again
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => sendDataToParent(1)}
              sx={{ bgcolor: "#1976d2" }}
            >
              Hard
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => sendDataToParent(2)}
              sx={{ bgcolor: "#1976d2" }}
            >
              Good
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => sendDataToParent(3)}
              sx={{ bgcolor: "#1976d2" }}
            >
              Easy
            </Button>
          </Stack>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={() => setDisplayAnswer((prev) => !prev)}
            sx={{ bgcolor: "#1976d2" }}
          >
            {displayAnswer ? "Hide" : "Show"}
          </Button>
        )}
      </Stack>
    </section>
  );
};
