
const Movie = ({ movie, onSelectMovie }) => {
	return (
		<li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster.includes("N/A") ? "./no-image-available.jpg" : movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
	)
}

export default Movie