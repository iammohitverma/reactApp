import { useLoaderData } from "react-router-dom";
import { MovieCard } from "../MovieCard";
export const Movies = () => {
  const data = useLoaderData();
  return (
    <div className="py-5">
      <div className="container">
        <h1>Welcome to the Movie Page</h1>
        <div className="gallery mt-5">
          <div className="row g-3">
            {data.Search.map((movie, index) => {
              return <MovieCard key={index} movie={movie} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
