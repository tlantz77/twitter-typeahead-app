# Twitter Typeahead Sample Project

Simple React/Node/Express demonstrating typeahead functionality using React hooks and the development Twitter API.

Currently running at <https://twitter-typeahead.herokuapp.com/>.

## Getting Started
- To install dependencies run `npm i`
- To run the web app and api server together, run `npm run dev`
- To run the web app separately, run `npm run client`
- To run api server separately, (in another terminal) run `npm run server`

## Twitter-Screenname-Server API
- Run the twitter-screenname-server by running `npm run server`
- The server should be running on `http://localhost:4000`
- Navigating to `http://localhost:4000/twitter/user/search?username=chicago` should return a large JSON response.
- To use the api, you can make a request directly to `http://localhost:4000`.
- If port 4000 is in use, feel free to update server.js source code to use a different port.

