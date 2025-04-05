import React, { useEffect, useState, useRef } from "react";

const token = 'BQBLhm2JSzJswPG9XSSLc4sVugLtoUXrMzrBLlKSfo2_TP93IC7yiJZkV5-BxGqbXdv9-TKcMgMivtB7UyVufIIdlvPq8aAu5UA75zbamUkH-cjDfkEOxfkZdHFRjWaDdc53Jivvbbf_CxyaI2QvHfv6IAY9vmT_2V078BTOLTxwEudMRS4qubF56syUnlSxuUfBraXlwGTb0UtmKlULSjdI7CRQtrRGpPU8iVwTqzBMYuZHzxm8E37pug6jzPGc3b1GysGwSr-1eEhCjUmvelhChwq-vYbX0lrSkl9qbaTOysqfkwm3OwsC';

async function fetchWebApi(endpoint, method = 'GET', body = null) {
  const response = await fetch(`https://api.spotify.com/${endpoint}`, {
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

async function getTopTracks() {
  return (await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=20')).items;
}

function MusicPlayer() {
  const [topTracks, setTopTracks] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await getTopTracks();
        const formattedTracks = tracks.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists.map(artist => artist.name).join(", "),
          preview: track.preview_url,
          spotifyUrl: track.external_urls.spotify,
          imageUrl: track.album.images[1]?.url || track.album.images[0]?.url || "" // Medium size image
        }));

        setTopTracks(formattedTracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, []);

  const playAudio = (url) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(url);
    audioRef.current.play().catch(error => console.error("Audio playback error:", error));
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="music-player">
      {topTracks.length > 0 ? (
        <div className="track-list grid-container">
          {topTracks.map((track, index) => (
            <div key={track.id} className="track-card">
              <img src={track.imageUrl} alt={track.name} className="track-image" />
              <div className="track-info">
                <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" className="track-name">{track.name}</a>
                <p className="track-artist">{track.artist}</p>
                {track.preview && (
                  <div className="track-controls">
                    <button onClick={() => playAudio(track.preview)}>▶️ Play</button>
                    <button onClick={pauseAudio}>⏸️ Pause</button>
                    <button onClick={stopAudio}>⏹️ Stop</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading top tracks...</p>
      )}
      <style>
        {`
          .grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          .track-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .track-image {
            width: 100px;
            height: 100px;
            border-radius: 8px;
          }
        `}
      </style>
    </div>
  );
}

export default MusicPlayer;
