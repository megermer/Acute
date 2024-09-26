fetch('http://127.0.0.1:3333/api/similarity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      card_back: 'I love pizza',
      user_input: 'I could do this all day'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); 
  })
  .catch(error => console.error('Error:', error));
  