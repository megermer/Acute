import "./App.css";
import * as React from "react";
import { useState, useEffect } from "react";
// import data from "../src/data.json";
// import { getSimilarity } from "/backend/bert-call";
import { SelectPage } from "../src/components/select-page";
import { BertTutorial } from "../src/components/bert-tutorial";
import { SM2Tutorial } from "../src/components/sm2-tutorial";
import { SM2AI } from "../src/components/sm2-bert-page";
import data from './data.json';
import { getSimilarity } from "../backend/bert-call";
import supermemo  from "../backend/SM2";
import { convertToSM2Score } from "../backend/converter";

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
      if (rearrangedCards.every((card) => card.progressStage === 4)) {
        console.log("Study session complete")
      }
      if (efactor < 2) {
        rearrangedCards.splice(5, 0 , newCard);
        let removedCard = rearrangedCards.shift();
      } 


      setCards(rearrangedCards);
    }
  }

  // Page display data from components
  const handleDataDisplayPage = (data) => {
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
