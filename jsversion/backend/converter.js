export async function convertToSM2Score(bertSimilarityScore) {
    if (bertSimilarityScore >= 0.75) return 3;
    else if (bertSimilarityScore >= 0.70) return 2;
    else if (bertSimilarityScore >= 0.65) return 1;
    else return 0;
}