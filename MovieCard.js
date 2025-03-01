import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, onFavoriteToggle, isFavorite }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card shadow-lg">
        <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/movie/${movie.imdbID}`} className="text-decoration-none">
              {movie.Title}
            </Link>
          </h5>
          <p className="card-text"><strong>Year:</strong> {movie.Year}</p>
          <button
            className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"} w-100`}
            onClick={() => onFavoriteToggle(movie)}
          >
            {isFavorite ? "❤️ Remove" : "❤️ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
