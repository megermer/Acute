import { pipeline } from '@xenova/transformers';
import * as tf from '@tensorflow/tfjs'; // Add this for tensor operations

async function runSimilarity() {
    // Initialize the feature extraction pipeline
    const featureExtractor = await pipeline('feature-extraction');

    // Define your sentences
    const sentence1 = 'I hate pizza';
    const sentence2 = 'I love pizza';

    // Get embeddings for both sentences
    const embeddings1 = await featureExtractor(sentence1);
    const embeddings2 = await featureExtractor(sentence2);

    const vecA = embeddings1[0].data;
    const vecB = embeddings2[0].data;
    // Calculate cosine similarity
    const similarity = cosineSimilarity(vecA, vecB);

    console.log('Cosine Similarity:', similarity);
}

function cosineSimilarity(vecA, vecB) {
    const dotProduct = tf.dot(tf.tensor(vecA), tf.tensor(vecB)).dataSync()[0];
    const magnitudeA = tf.norm(tf.tensor(vecA)).dataSync()[0];
    const magnitudeB = tf.norm(tf.tensor(vecB)).dataSync()[0];
    return dotProduct / (magnitudeA * magnitudeB);
}

runSimilarity().catch(console.error);
