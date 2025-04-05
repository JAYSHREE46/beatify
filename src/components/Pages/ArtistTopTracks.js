import React, { useEffect, useState } from "react";

const token =   'BQBLhm2JSzJswPG9XSSLc4sVugLtoUXrMzrBLlKSfo2_TP93IC7yiJZkV5-BxGqbXdv9-TKcMgMivtB7UyVufIIdlvPq8aAu5UA75zbamUkH-cjDfkEOxfkZdHFRjWaDdc53Jivvbbf_CxyaI2QvHfv6IAY9vmT_2V078BTOLTxwEudMRS4qubF56syUnlSxuUfBraXlwGTb0UtmKlULSjdI7CRQtrRGpPU8iVwTqzBMYuZHzxm8E37pug6jzPGc3b1GysGwSr-1eEhCjUmvelhChwq-vYbX0lrSkl9qbaTOysqfkwm3OwsC';

async function fetchWebApi(endpoint, method = 'GET', body = null) {
  const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${response.statusText}`);
  }

  return await response.json();
}

async function getArtistTopTracks() {
  return (await fetchWebApi('artists/0TnOYISbd1XYRBk9myaseg/top-tracks?market=US')).tracks;
}

function ArtistTopTracks() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchedTracks = await getArtistTopTracks();
        const formattedTracks = fetchedTracks.map(track => ({
          id: track.id,
          name: track.name,
          album: track.album.name,
          albumImage: track.album.images[0]?.url, // Get album image
          artist: track.artists.map(artist => artist.name).join(", "),
          preview: track.preview_url,
          spotifyUrl: track.external_urls.spotify,
        }));

        setTracks(formattedTracks);
      } catch (error) {
        console.error("Error fetching artist's top tracks:", error);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="artist-top-tracks">
      <h2>Artist Top Tracks</h2>
      {tracks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Album Cover</th>
              <th>Track</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map(track => (
              <tr key={track.id}>
                <td>
                  {track.albumImage && (
                    <img src={track.albumImage} alt={track.album} width="50" height="50" />
                  )}
                </td>
                <td>
                  <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer">
                    {track.name}
                  </a>
                </td>
                <td>{track.artist}</td>
                <td>{track.album}</td>
                <td>
                  {track.preview && (
                    <audio controls>
                      <source src={track.preview} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading top tracks...</p>
      )}
    </div>
  );
}

export default ArtistTopTracks;
