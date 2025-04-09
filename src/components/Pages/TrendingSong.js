import { useEffect, useState } from "react";
import React from "react";

const TrendingSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      const accessToken = 'BQCdya8qedaF5V_R6hyH5yA5VuC2Ydy8BQ6geMu-Imtr15GmcArc7Qh83dx3-V2a0cSPmgBioVJkpuo7p2wPkaVRC05nyzU2FBRz7Xhlovnj722qFHlUn-Nl1JcSViRlehkc9fxTmKuzCrKtSUki0qE-wEQinSUYiVz8_ONNW52c8eaAXxGa4e_8LYU_t50BL8Bui1wvSXV187Tw-A268xSoP7dljE__xO8_j-849QSjPL-0S_iXKcVqb8pY2ijfVkT7-DgW3_Ovl-YZYvbNEnBAIkOfkak-XoEwTG4Gpl6JtQCN9SjTWKJI';
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
