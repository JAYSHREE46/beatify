import { useEffect, useState } from "react";
import React from "react";

const TrendingSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      const accessToken = 'BQBLhm2JSzJswPG9XSSLc4sVugLtoUXrMzrBLlKSfo2_TP93IC7yiJZkV5-BxGqbXdv9-TKcMgMivtB7UyVufIIdlvPq8aAu5UA75zbamUkH-cjDfkEOxfkZdHFRjWaDdc53Jivvbbf_CxyaI2QvHfv6IAY9vmT_2V078BTOLTxwEudMRS4qubF56syUnlSxuUfBraXlwGTb0UtmKlULSjdI7CRQtrRGpPU8iVwTqzBMYuZHzxm8E37pug6jzPGc3b1GysGwSr-1eEhCjUmvelhChwq-vYbX0lrSkl9qbaTOysqfkwm3OwsC';
      const url = "https://api.spotify.com/v1/browse/new-releases";

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
        setSongs(data.albums.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingSongs();
  }, []);

  if (loading) return <p>Loading trending songs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Trending Songs</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <img src={song.images[0].url} alt={song.name} width="50" />
            <a
              href={`https://open.spotify.com/album/${song.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {song.name} - {song.artists.map((artist) => artist.name).join(", ")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingSongs;
