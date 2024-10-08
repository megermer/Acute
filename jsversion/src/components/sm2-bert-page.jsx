import "./App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const SM2AI = () => {
  return (
    <div id="cards-cont">
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
    </div>
  );
};
