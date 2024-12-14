import { NavLink } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <div className="col-md-3">
      <div className="card">
        {movie.Poster != "N/A" && (
          <img src={movie.Poster} className="card-img-top" alt="..." />
        )}
        <div className="card-body">
          <h5 className="card-title">{movie.Title}</h5>
          <p>{movie.Type}</p>
          <p>{movie.Year}</p>
          <p>{movie.imdbID}</p>
          <NavLink to={`/movie/${movie.imdbID}`} className="btn btn-primary">
            Go somewhere
          </NavLink>
        </div>
      </div>
    </div>
  );
};
