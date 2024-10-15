/**
 * @typedef {Object} SuperMemoItem
 * @property {number} interval - The current interval for the item.
 * @property {number} repetition - The current repetition count.
 * @property {number} efactor - The current ease factor.
 * @property {string} question - The question.
 * @property {string} answer - The answer.
 * @property {number} id - The card's unique ID.
 * @property {number} progressStage - 1, 2, 3, 4
 */

/**
 * @typedef {0 | 1 | 2 | 3 } SuperMemoGrade
 */

/**
 * Calculates the next SuperMemo interval, repetition, and ease factor based on the grade.
 * 
 * @param {SuperMemoItem} item - The current state of the item (interval, repetition, efactor).
 * @param {SuperMemoGrade} grade - The grade given to the item (0-5).
 * @returns {SuperMemoItem} The updated item with new interval, repetition, and efactor.
 */
export default function supermemo(item, grade) {
    let nextInterval;
    let nextRepetition;
    let nextEfactor;
    let nextProgressStage;
  
    if (grade >= 2) {
      if (item.repetition === 0) {
        nextInterval = 1;   // Whenever we see the card next
        nextRepetition = 1; // Incrementing the number of correct responses
        nextProgressStage = 2;
      } else if (item.repetition === 1) {
        nextInterval = 6;
        nextRepetition = 2;
        nextProgressStage = 2;
      } else {
        nextInterval = Math.round(item.interval * item.efactor);
        nextRepetition = item.repetition + 1;
        item.progressStage === 3 ? nextProgressStage = 4 : nextProgressStage = 3
      }
    } else {
      nextInterval = 1;
      nextRepetition = 0;
      nextProgressStage = 2;
    }
  
    nextEfactor = item.efactor + (0.1 - (3 - grade) * (0.08 + (3 - grade) * 0.02));
  
    if (nextEfactor < 1.3) nextEfactor = 1.3;
  

    return {
      interval: nextInterval,
      repetition: nextRepetition,
      efactor: nextEfactor,
      question: item.question,
      answer: item.answer,
      id: item.id,
      progressStage: nextProgressStage,
    };
  }
  