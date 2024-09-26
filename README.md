Instructions for BERT project.

- `cd bert`
- Create a venv, and make sure to add `{venv-name}/` to the `.gitignore` file.
- While in the `bert` directory, activate venv with `{venv-name}/Scripts/activate` 
- Run `pip install flask flasgger sentence_transformers flask_cors`
- Run server with `python app.py` and it will be on `Port 3333`
- To see Swagger doc, navigate to `http://127.0.0.1:3333/apidocs` 
- The similarity score endpoint is `http://127.0.0.1:3333/api/similarity`

