from bert import bert_model
from flask import Flask, jsonify, request
from flasgger import Swagger

app = Flask(__name__)
swagger = Swagger(app)

@app.route('/api/healthcheck', methods=['GET'])
def healthcheck():
    """
    API healthcheck endpoint
    ---
    responses:
      200:
        description: A successful response
        schema:
          type: object
          properties:
            message:
              type: string
              example: API is up and running successfully.
    """
    return jsonify(message="API is up and running successfully.")

@app.route('/api/similarity', methods=['POST'])
def similarity():
    """
    Endpoint to find the similarity score between the card back and the user input.
    ---
    parameters:
      - name: card_back
        in: formData
        type: string
        required: true
        description: Answer on back of card.
      - name: user_input
        in: formData
        type: string
        required: true
        description: The user's input.
    responses:
      200:
        description: Similarity score
        schema:
          type: object
          properties:
            word_count:
              type: float
              example: 0.992
    """
    data = request.get_json()

    card_back = data.get('card_back')
    user_input = data.get('user_input')

    if not card_back or not user_input:
        return jsonify({"error": "Both inputs are required"}), 400

    similarity_score = bert_model(card_back, user_input)
    
    return jsonify({"similarity_score": similarity_score})


if __name__ == '__main__':
    app.run(debug=True, port=3333)
