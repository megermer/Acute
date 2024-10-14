import "./App.css";
import * as React from "react";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import data from "../src/data.json";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import { getSimilarity } from "../backend/bert-call"
=======
// import data from "../src/data.json";
// import { getSimilarity } from "/backend/bert-call";
import { SelectPage } from "../src/components/select-page";
import { BertTutorial } from "../src/components/bert-tutorial";
import { SM2Tutorial } from "../src/components/sm2-tutorial";
import { SM2AI } from "../src/components/sm2-bert-page";
// import { SM2 } from "../src/components/sm2-page";

>>>>>>> develop

function App() {
  const algorithmTable = {
    0: "SELECT",
    1: "SM2",
    2: "SM2AI",
    3: "SM2TUTORIAL",
    4: "SM2AITUTORIAL",
  };

<<<<<<< HEAD
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
  const displayAnswer = async () => {
    if (inputValue) {
      setDisplayingAnswer((prevState) => !prevState);
      const result = await getSimilarity("I like pizza", "I hate pizza");
      console.log(result);
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
=======
  // Select Algorithm page to be displayed
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(() => {
    const savedData = localStorage.getItem("selectedAlgorithm");
    return savedData ? JSON.parse(savedData) : 0;
>>>>>>> develop
  });

  // Page display data from components
  const handleDataDisplayPage = (data) => {
    setSelectedAlgorithm(data);
  };

  const handleDataFomSM2AI = () => {

  }

  const handleDataFomSM2 = () => {

  }
 
  return (
    <div id="root-page">
      {algorithmTable[selectedAlgorithm] === "SM2AI" ? (
        // <SM2AI onData={handleDataFomSM2AI} />
        <p>Should show SM2AI Component</p>
      ) : algorithmTable[selectedAlgorithm] === "SM2" ? (
        // <SM2 onData={handleDataFomSM2} />
        <p>Should show SM2 Component</p>
      ) : algorithmTable[selectedAlgorithm] === "SM2AITUTORIAL" ? (
        <BertTutorial onData={handleDataDisplayPage} />
      ) : algorithmTable[selectedAlgorithm] === "SM2TUTORIAL" ? (
        <SM2Tutorial onData={handleDataDisplayPage} />
        // <p>Testing SM2Tutorial</p>
      ) : (
        <SelectPage onData={handleDataDisplayPage} />
      )}
    </div>
  );
}

export default App;
