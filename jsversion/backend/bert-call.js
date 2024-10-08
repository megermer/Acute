export async function getSimilarity(card_back, user_input) {
  const data = {
    card_back: card_back,
    user_input: user_input
  };

  const response = await fetch('http://127.0.0.1:3333/api/similarity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

let card_back = "I like pizza"
let user_input = "I like pizza"

getSimilarity(card_back, user_input)
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error('Error: ', error)
  })