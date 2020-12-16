# Twitter Typeahead Sample Project

## Getting Started
- To install dependencies run `yarn`
- To run the web app and api server together, run `npm run dev`
- To run the web app separately, run `npm run start`
  - This may take a minute or 2 to run
- To run api server separately, (in another terminal) run `npm run server`

## Twitter-Screenname-Server API
- Run the twitter-screenname-server by running `npm run server`
- The server should be running on `http://localhost:4000`
- Navigating to `http://localhost:4000/twitter/user/search?username=chicago` should return a large JSON response.
- To use the api, you can make a request directly to `http://localhost:4000`.
- If port 4000 is in use, feel free to update /twitter-screenname-server/server.js source code to use a different port.

