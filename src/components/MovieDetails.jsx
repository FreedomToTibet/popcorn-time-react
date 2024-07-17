import {useState, useEffect, useRef} from 'react';
import Loader from '../ui/Loader';
import useKey from '../hooks/useKey';

const MovieDetails = ({selectedId, onCloseMovie, onAddWatched, watched}) => {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState('');

	const countRef = useRef(0);
	const KEY = "ed8c84e0";

	useEffect(() => {
      if (userRating) countRef.current++;
    }, [userRating]);

	const isWatched = watched?.map((movie) => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched?.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating;

	const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

	const isTop = imdbRating > 8;

	useKey("Escape", onCloseMovie);

	useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

	useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (<Loader />) : (
      <>
        <header>
          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>
          <img src={poster} alt={`Poster of ${movie} movie`} />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>{released} &bull; {runtime}</p>
            <p>{genre}</p>
            <p>
              <span>⭐️</span>
              {imdbRating} IMDb rating
            </p>
          </div>
        </header>
      </>)
			}
    </div>
  );
};

export default MovieDetails;
