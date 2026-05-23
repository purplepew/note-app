# Note App

This project has a React client and an Express/MongoDB server.

## Required environment variables

Create a `.env` file in `server/` with these values:

```env
DATABASE_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

The server runs on port `3500`.

## Run the server

From the `server/` folder:

```bash
npm install
npm start
```

The server script uses `nodemon server.js`, so `nodemon` must be available in your environment.

## Run the client

From the `client/` folder:

```bash
npm install
npm start
```

The client runs on `http://localhost:3000` and talks to the server at `http://localhost:3500`.

Create a `client/.env.local` file if you want to change the API URL without touching source code:

```env
REACT_APP_API_URL=http://localhost:3500
```

For deployment, set `REACT_APP_API_URL` to your hosted server URL.

## Notes

- Start the server before using the app.
- If the client cannot reach the API, make sure the server is running and the `.env` values are set correctly.
