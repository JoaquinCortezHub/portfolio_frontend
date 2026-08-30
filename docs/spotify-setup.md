# Spotify listening activity

The Spotify desktop app reads Joaquín's live listening activity through the
server-only `/api/spotify` route. Browser code never receives Spotify client
credentials or refresh tokens.

## Required Spotify scopes

Create a Spotify app at https://developer.spotify.com/dashboard and authorize
the owner account with both scopes:

- `user-read-recently-played`
- `user-read-currently-playing`

The authorization-code flow returns a refresh token. Spotify's official guides
for the flow and token refresh are:

- https://developer.spotify.com/documentation/web-api/tutorials/code-flow
- https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens

## Local environment

Copy `.env.example` to `.env.local` and set:

```text
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

All three variables are server-only. Do not prefix them with `NEXT_PUBLIC_`,
commit `.env.local`, paste them into an issue, or expose them in browser code.

Run `npm run dev`, then open the Spotify app in the portfolio. The API refreshes
Spotify's one-hour access token on the server and the UI refreshes listening
activity every minute.

## Vercel deployment

Add the same three variables under Project Settings > Environment Variables for
Production, Preview, and Development as appropriate. Redeploy after adding or
rotating them.

The integration deliberately degrades to a safe setup state when credentials
are absent. Provider failures return a generic message; Spotify response bodies
and secrets are never sent to visitors.
