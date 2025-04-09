import { useEffect, useState } from "react";
import React from "react";

const SpotifyPopularSongs = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularSongs = async () => {
      const accessToken = 'BQA-5F93qFkKnu0wVUZfHFm0Gt30PPl_1DCF1CsNsbJun5d22yW42anMufAuSoI3W8ujywRVxt132h5QPYZcxV2o4HqWwYS9de0di3eKln6UuifaJgy-REBi94KayYuTtPAtQFC2OCk1GmP1W7lu0hkOR2g7V7-Td4AkQQG98Kt9buymHSL3qAlWviBzCt8OfVKYJfi4AAP62I5t979ma6ltXDukfAwWniCqKVgUOWmyFvSrVGCg4nAsw_cql3o4lpm1J-HdCR0r2wJMMvxmXTJ6PyD5QXGGIfuy0PmxjEU95RVT88ob5ZMo';
      const url = "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M"; // Spotify's Today’s Top Hits playlist

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTracks(data.tracks.items.map(item => item.track));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularSongs();
  }, []);

  if (loading) return <p>Loading popular songs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Popular Songs</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            <img src={track.album.images[0].url} alt={track.name} width="50" />
            <p>{track.name} - {track.artists.map(artist => artist.name).join(", ")}</p>
            <audio controls>
              <source src={track.preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <a
              href={`https://open.spotify.com/track/${track.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Play on Spotify
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyPopularSongs;
