from sentence_transformers import SentenceTransformer, util

# Load pre-trained BERT model from SentenceTransformers
model = SentenceTransformer('bert-base-nli-mean-tokens')

# Example sentences to compare
sentence1 = "I love programming in Python."
sentence2 = "I do enjoy writing Anaconda code."

# Generate embeddings for each sentence
embedding1 = model.encode(sentence1, convert_to_tensor=True)
embedding2 = model.encode(sentence2, convert_to_tensor=True)

# Compute the cosine similarity between the two sentence embeddings
similarity = util.cos_sim(embedding1, embedding2)

# Output similarity score
print(f"Similarity score: {similarity.item()}")

# Set a threshold for similarity (you can tweak this based on your use case)
threshold = 0.75

# Check if the sentences are saying the same thing
if similarity.item() >= threshold:
    print("The sentences are saying the same thing.")
else:
    print("The sentences are not saying the same thing.")
