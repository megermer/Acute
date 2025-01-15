/**
 * @typedef {Object} SuperMemoItem
 * @property {number} repetition - The current repetition count.
 * @property {number} efactor - The current ease factor.
 * @property {string} question - The question.
 * @property {string} answer - The answer.
 * @property {number} id - The card's unique ID.
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
    let nextRepetition;
    let nextEfactor;
  
    console.log('item.efactor: ', item.efactor)
    console.log('grade', grade)
    if (grade >= 2) {
      nextRepetition = item.repetition + 1;
    } else {
      nextRepetition = 0;
    }
  
    nextEfactor = item.efactor + (0.1 - (3 - grade) * (0.08 + (3 - grade) * 0.02));  

    if (nextEfactor < 2.3) nextEfactor = 2.3;
  
    console.log("new efactor", nextEfactor)

    return {
      repetition: nextRepetition,
      efactor: nextEfactor,
      question: item.question,
      answer: item.answer,
      id: item.id,
    };
  }
  