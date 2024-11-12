import "./App.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { SelectPage } from "../src/components/select-page";
import { BertTutorial } from "../src/components/bert-tutorial";
import { SM2Tutorial } from "../src/components/sm2-tutorial";
import { SM2AI } from "../src/components/sm2-bert-page";
import data from './data.json';
import { getSimilarity } from "../backend/bert-call";
import supermemo  from "../backend/SM2";
import { SM2 } from "../src/components/sm2-page"
import { convertToSM2Score } from "../backend/converter";
import {CompletePage} from "../src/components/complete"

function App() {
  const algorithmTable = {
    0: "SELECT",
    1: "SM2",
    2: "SM2AI",
    3: "SM2TUTORIAL",
    4: "SM2AITUTORIAL",
    5: "COMPLETEPAGE"
  };

  // Select Algorithm page to be displayed
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(() => {
    const savedData = localStorage.getItem("selectedAlgorithm");
    return savedData ? JSON.parse(savedData) : 0;
  });

  // Set cards 
  const [cards, setCards] = useState();

  const handleCardChange = (newCard) => {
    let rearrangedCards = [...cards]
    let index;
    if (newCard.efactor < 2) { // Hard
      index = 5;
    } else if (newCard.efactor < 2.5) { // Medium
      index = Math.floor(Math.random() * (19 - 10)) + 10;
    } else if (newCard.efactor < 3) { // Easy
      index = Math.floor(Math.random() * (29 - 20)) + 20;
    }

    rearrangedCards.splice(index, 0, newCard);
    rearrangedCards.shift();
    if (rearrangedCards.every((card) => (card.efactor > 2.5 && card.repetition > 4))) {
      setSelectedAlgorithm(5)
    }
    // console.log("rearranged cards after shifts: ", rearrangedCards)
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

  const handleDataFomSM2AI = async(userAnswer, cardOver) => {
    if (cardOver){
      let bertScore = await getSimilarity(cards[0].answer, userAnswer);
      if (bertScore < 0) {
        bertScore = 0.1;
      }
      const SM2Grade = await convertToSM2Score(bertScore.similarity_score);
      const newCard = supermemo(cards[0], SM2Grade);
      handleCardChange(newCard);
    }
  }

  const handleDataFomSM2 = (SM2Grade, cardOver) => {
    if (cardOver) {
      const newCard = supermemo(cards[0], SM2Grade);
      handleCardChange(newCard)
    }
  }

  const deleteLocalStorage = () => {
    setSelectedAlgorithm(0);
  };

  
  useEffect(() => {
    const initialCards = convertDataToCardObject(data);
    console.log("initial cards: ", initialCards)
    setCards(initialCards);
  }, []);


  const convertDataToCardObject = (data) => {
    try {
      const updatedCards = data.map(card => ({
        ...card, 
        interval: 0,
        repetition: 0,
        efactor: 2.5
      }))
      return updatedCards
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
        <button onClick={deleteLocalStorage}>Refresh Page</button>
        {algorithmTable[selectedAlgorithm] === "SM2AI" ? (
          <SM2AI onData={handleDataFomSM2AI} cards={cards} />
        ) : algorithmTable[selectedAlgorithm] === "SM2" ? (
          <SM2 onData={handleDataFomSM2} cards={cards} />
        ) : algorithmTable[selectedAlgorithm] === "SM2AITUTORIAL" ? (
          <BertTutorial onData={handleDataDisplayPage} />
        ) : algorithmTable[selectedAlgorithm] === "SM2TUTORIAL" ? (
          <SM2Tutorial onData={handleDataDisplayPage} />
        ) : algorithmTable[selectedAlgorithm] === "SELECT" ? (
          <SelectPage onData={handleDataDisplayPage} />
        ) : (
          <CompletePage />
        )}
      </div>
    </div>
  );
}

export default App;
