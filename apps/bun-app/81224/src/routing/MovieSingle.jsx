import { useParams, useLoaderData } from "react-router-dom";
export const MovieSingle = () => {
  const singleMovieParam = useParams();
  const singleMovieData = useLoaderData();

  return (
    <div className="single_movie py-5">
      <div className="container">
        <h1>Welcome to the {singleMovieParam.ID} Movie Single Page</h1>
        <div className="row">
          <div className="col-6 mx-auto">
            <div className="card">
              {singleMovieData.Poster != "N/A" && (
                <img
                  src={singleMovieData.Poster}
                  className="card-img-top"
                  alt="..."
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{singleMovieData.Title}</h5>
                <p>{singleMovieData.Type}</p>
                <p>{singleMovieData.Year}</p>
                <p>{singleMovieData.imdbID}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
