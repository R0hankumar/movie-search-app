import React, { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const API_KEY = "101aef6c";

  useEffect(() => {
    if (searchTerm.length < 3) {
      setSuggestions([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Search) {
        setSuggestions(data.Search);
      }
    }, 500); // 500ms delay to prevent excessive API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100">
          {suggestions.map((movie) => (
            <li key={movie.imdbID} className="list-group-item">
              {movie.Title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
