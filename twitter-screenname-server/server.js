const Twitter = require('twitter');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;

//Add keys and secrets here
const client = new Twitter({
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
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

	client.get('/users/search', { q: username }, (error, users, response) => {
		if (error) {
			res.status(error.code).send({ error });
		} else {
			res.status(200).send({ users, response });
		}
	});
});

app.listen(PORT, () => {
	/* eslint-disable no-console */
	console.log('listening on port ' + PORT + '...');
	/* eslint-enable no-console */
});
