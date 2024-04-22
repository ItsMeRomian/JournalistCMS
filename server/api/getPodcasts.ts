import { defineEventHandler } from "h3";

import SpotifyWebApi from "spotify-web-api-node";

export default defineEventHandler(async (event) => {
  return [];
  const spotifyApi = new SpotifyWebApi({
    clientId: "x",
    clientSecret: "x",
  });
  const grant = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(grant.body.access_token);

  const allEpisodes = await spotifyApi.getShowEpisodes(
    "3OAk3WQo6Ea7Z2K9wuvFn5",
    { offset: 0, limit: 50, market: "NL" }
  );

  return allEpisodes.body.items
    .filter((e) => e.description.includes("Lotte"))
    .map((e) => {
      return {
        title: e.name,
        desc: e.description,
        link: e.external_urls.spotify,
        date: e.name.substring(0, 10),
      };
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
});