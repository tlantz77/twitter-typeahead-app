const Twitter = require('twitter');
const express = require('express');
const app = express();
const cors = require('cors');

const keys = require('./config/keys');

//Add keys and secrets here
const client = new Twitter({
	consumer_key: keys.TWITTER_CONSUMER_KEY,
	consumer_secret: keys.TWITTER_CONSUMER_SECRET,
	access_token_key: keys.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
});

// CORS support
app.use(cors());

app.get('/', (req, res) => {
	res.status(200).send({
		data: 'Successful request',
	});
});

app.get('/twitter/user/search', (req, res) => {
	const username = req.query.username;
  console.log("USERNAME SEARCH: ", username);
	client.get('/users/search', { q: username }, (error, users, response) => {
		if (error) {
			res.status(error.code).send({ error });
		} else {
			res.status(200).send({ users, response });
		}
	});
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(process.env.NODE_ENV);
	console.log('listening on port ' + PORT + '...');
	/* eslint-enable no-console */
});


