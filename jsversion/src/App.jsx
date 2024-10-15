import "./App.css";
import * as React from "react";
import { useState, useEffect } from "react";
// import data from "../src/data.json";
// import { getSimilarity } from "/backend/bert-call";
import { SelectPage } from "../src/components/select-page";
import { BertTutorial } from "../src/components/bert-tutorial";
import { SM2Tutorial } from "../src/components/sm2-tutorial";
import { SM2AI } from "../src/components/sm2-bert-page";
<<<<<<< HEAD
import data from './data.json';
import { getSimilarity } from "../backend/bert-call";
import supermemo  from "../backend/SM2";
import { convertToSM2Score } from "../backend/converter";
=======
import { SM2 } from "../src/components/sm2-page";
>>>>>>> develop

function App() {
  const algorithmTable = {
    0: "SELECT",
    1: "SM2",
    2: "SM2AI",
    3: "SM2TUTORIAL",
    4: "SM2AITUTORIAL",
  };

  // Select Algorithm page to be displayed
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(() => {
    const savedData = localStorage.getItem("selectedAlgorithm");
    return savedData ? JSON.parse(savedData) : 0;
  });

  // Set cards 
  const [cards, setCards] = useState([{}]);

  const handleCardChange = (newCard) => {
      let rearrangedCards = [...cards]
      let index;
      if (newCard.efactor < 2) { // Hard
        index = 5;
      } else if (newCard.efactor < 2.25) { // Medium
        index = Math.floor(Math.random() * (19 - 10)) + 10;
      } else if (newCard.efactor < 3) { // Easy
        let index = Math.floor(Math.random() * (29 - 20)) + 20;
      }

      rearrangedCards.splice(index, 0, newCard);
      let removedCard = rearrangedCards.shift();

      if (rearrangedCards.every((card) => card.efactor > 2.3)) {
        console.log("Study session complete")
      }

      setCards(rearrangedCards);
  }
  
  useEffect(() => {
    localStorage.setItem("selectedAlgorithm", selectedAlgorithm);
  }, [selectedAlgorithm]);

  // Page display data from components
  const handleDataDisplayPage = (data) => {
    console.log("page selected: ", data);
    setSelectedAlgorithm(data);
  };

  const handleDataFomSM2AI = async(currentCard, userAnswer) => {
    const bertScore =await getSimilarity(currentCard.answer, userAnser);
    const SM2Grade = convertToSM2Score(bertScore);
    const newCard = supermemo(currentCard, SM2Grade);
    handleCardChange(newCard);
  }

  const handleDataFomSM2 = (currentCard, SM2Grade) => {
    const newCard = supermemo(currentCard, SM2Grade);
    handleCardChange(newCard);
  }

  const deleteLocalStorage = () => {
    setSelectedAlgorithm(0);
  };

  const convertDataToCardObject = async() => {
    try {
      const updatedCards = data.map(card => ({
        ...card, 
        interval: 0,
        repetition: 0,
        efactor: 2.5, 
        introStage: true
      }))
      setCards(() => {
        return updatedCards;
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
 
  return (
    <div id="root-page">
      <navbar id="navbar">
        <p>Acute</p>
      </navbar>
      <div id="content">
        <button onClick={deleteLocalStorage}>Test</button>
        {algorithmTable[selectedAlgorithm] === "SM2AI" ? (
          <SM2AI onData={handleDataFomSM2AI} />
        ) : algorithmTable[selectedAlgorithm] === "SM2" ? (
          <SM2 onData={handleDataFomSM2} />
        ) : algorithmTable[selectedAlgorithm] === "SM2AITUTORIAL" ? (
          <BertTutorial onData={handleDataDisplayPage} />
        ) : algorithmTable[selectedAlgorithm] === "SM2TUTORIAL" ? (
          <SM2Tutorial onData={handleDataDisplayPage} />
        ) : (
          <SelectPage onData={handleDataDisplayPage} />
        )}
      </div>
    </div>
  );
}

export default App;
