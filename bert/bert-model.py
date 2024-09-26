from sentence_transformers import SentenceTransformer, util

# Load the model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Define your paragraphs
paragraph1 = "The new movie is awesome."
paragraph2 = "The new book is so great."

# Compute embeddings
embedding1 = model.encode(paragraph1)
embedding2 = model.encode(paragraph2)

# Compute cosine similarity
similarity = util.cos_sim(embedding1, embedding2)

print(f"Similarity score: {similarity.item():.4f}")
