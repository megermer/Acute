from sentence_transformers import SentenceTransformer, util


def bert_model(card_back, user_input): 
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    card_back_embedding = model.encode(card_back)
    user_input_embedding = model.encode(user_input)

    similarity = util.cos_sim(card_back_embedding, user_input_embedding)

    print(similarity.item())
    return similarity.item()

s1 = "I love pizza"
s2 = "I really like pizza"

bert_model(s1, s2)

