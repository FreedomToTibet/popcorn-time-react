import Movie from "./Movie";

const MovieList = ({movies, onSelectMovie}) => {
	const moviesRender = movies?.map((movie) => (
		<Movie 
			key={movie.imdbID}
			movie={movie}
			onSelectMovie={onSelectMovie}
		/>
	));

	return (
		<ul className="list list-movies">
			{moviesRender}
		</ul>
	)
}

export default MovieList;