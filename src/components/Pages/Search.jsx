import React, { useState } from "react";

const token ='BQCdya8qedaF5V_R6hyH5yA5VuC2Ydy8BQ6geMu-Imtr15GmcArc7Qh83dx3-V2a0cSPmgBioVJkpuo7p2wPkaVRC05nyzU2FBRz7Xhlovnj722qFHlUn-Nl1JcSViRlehkc9fxTmKuzCrKtSUki0qE-wEQinSUYiVz8_ONNW52c8eaAXxGa4e_8LYU_t50BL8Bui1wvSXV187Tw-A268xSoP7dljE__xO8_j-849QSjPL-0S_iXKcVqb8pY2ijfVkT7-DgW3_Ovl-YZYvbNEnBAIkOfkak-XoEwTG4Gpl6JtQCN9SjTWKJI';

async function searchTracks(query) {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${response.statusText}`);
    return [];
  }

  const data = await response.json();
  return data.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists.map(artist => artist.name).join(", "),
    preview: track.preview_url,
    spotifyUrl: track.external_urls.spotify,
    imageUrl: track.album.images[1]?.url || track.album.images[0]?.url || ""
  }));
}

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    const tracks = await searchTracks(query);
    setResults(tracks);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>🔍 Search</button>
      </div>
      <div className="search-results grid-container">
        {results.map(track => (
          <div key={track.id} className="track-card">
            <img src={track.imageUrl} alt={track.name} className="track-image" />
            <div className="track-info">
              <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" className="track-name">{track.name}</a>
              <p className="track-artist">{track.artist}</p>
            </div>
          </div>
        ))}
      </div>
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
          .search-container {
            text-align: center;
            margin-bottom: 20px;
          }
          .search-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
          }
          .search-bar input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 20px;
            width: 250px;
            outline: none;
            font-size: 16px;
          }
          .search-button {
            padding: 10px 20px;
            background-color: #1DB954;
            border: none;
            border-radius: 20px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .search-button:hover {
            background-color: #169c45;
          }
        `}
      </style>
    </div>
  );
}

export default Search;
