import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";

function Home({ toggleFavorite, favorites, darkMode }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = async (term, pageNum = 1) => {
    setLoading(true);
    const API_KEY = "101aef6c";
    const response = await fetch(`https://www.omdbapi.com/?s=${term}&page=${pageNum}&apikey=${API_KEY}`);
    const data = await response.json();
    
    if (data.Search) {
      setMovies(data.Search);
      setTotalResults(data.totalResults);
    } else {
      setMovies([]);
    }
    setLoading(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
    fetchMovies(term, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchMovies(searchTerm, newPage);
  };

  return (
    <div className={`container mt-4 p-3 rounded ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <h1 className="text-center">🎬 Movie Search App</h1>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h2>Search Results</h2>
          <MovieList movies={movies} onFavoriteToggle={toggleFavorite} favorites={favorites} />
          <Pagination currentPage={page} totalResults={totalResults} onPageChange={handlePageChange} />

          <h2 className="mt-4">❤️ Favorite Movies</h2>
          <MovieList movies={favorites} onFavoriteToggle={toggleFavorite} favorites={favorites} />
        </>
      )}
    </div>
  );
}

export default Home;
