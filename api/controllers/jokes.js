const fetch = require('node-fetch');

const getAllJokes = (req, res) => {
  console.log("I GOT HERE!!: ", req.decoded);
  if (req.decoded) {
    console.log("I GOT HERE!!!");
    fetch(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
      .then(p => p.json())
      .then(jokes => {
        console.log("JOKES ARE: ", jokes);
        res.json(jokes);
      })
      .catch(err => res.status(500).json({ error: 'Error Fetching Jokes' }));
  } else {
    return res.status(422).json({ error: `Can't get these jokes!` });
  }
};

module.exports = {
  getAllJokes
};