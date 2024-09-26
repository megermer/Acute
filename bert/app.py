from flask import Flask, jsonify, request
from flasgger import Swagger

app = Flask(__name__)
swagger = Swagger(app)

@app.route('/api/hello', methods=['GET'])
def hello():
    """
    A simple hello world endpoint.
    ---
    responses:
      200:
        description: A successful response
        schema:
          type: object
          properties:
            message:
              type: string
              example: Hello, World!
    """
    return jsonify(message="Hello, World!")

@app.route('/api/wordcount', methods=['POST'])
def word_count():
    """
    Endpoint to count words in two paragraphs.
    ---
    parameters:
      - name: paragraph1
        in: formData
        type: string
        required: true
        description: The first paragraph.
      - name: paragraph2
        in: formData
        type: string
        required: true
        description: The second paragraph.
    responses:
      200:
        description: Word count
        schema:
          type: object
          properties:
            word_count:
              type: integer
              example: 100
    """
    paragraph1 = request.form.get('paragraph1')
    paragraph2 = request.form.get('paragraph2')

    if not paragraph1 or not paragraph2:
        return jsonify({"error": "Both paragraphs are required"}), 400

    total_words = len(paragraph1.split()) + len(paragraph2.split())
    return jsonify({"word_count": total_words})


if __name__ == '__main__':
    app.run(debug=True, port=3333)
