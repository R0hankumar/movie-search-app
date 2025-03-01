import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, onFavoriteToggle, favorites }) {
  return (
    <div className="row">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
          />
        ))
      ) : (
        <p className="text-center">No movies found.</p>
      )}
    </div>
  );
}

export default MovieList;
