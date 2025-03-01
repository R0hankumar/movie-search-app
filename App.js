import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Pagination from "./components/Pagination";
import "./styles/styles.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

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

  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.some((fav) => fav.imdbID === movie.imdbID)
      ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Router>
      <div className={`container mt-4 p-3 rounded ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
        <button className="btn btn-secondary mb-3" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <Routes>
          <Route
            path="/"
            element={
              <>
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
              </>
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
