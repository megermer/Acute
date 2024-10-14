export async function convertToSM2Score(bertSimilarityScore) {
    if (bertSimilarityScore >= 0.96) return 3;
    else if (bertSimilarityScore >= 0.9) return 2;
    else if (bertSimilarityScore >= 0.85) return 1;
    else return 0;
}
  
