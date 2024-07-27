import {useState} from 'react';

import NavBar from './components/NavBar';
import Main from './components/Main';
import Box from './components/Box';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import WatchedMovieList from './components/WatchedMovieList';
import WatchedSummary from './components/WatchedSummary';

import Search from './ui/Search';
import Counter from './ui/Counter';
import Loader from './ui/Loader';
import ErrorMessage from './ui/ErrorMessage';

import {useMovies} from './hooks/useMovies';
import {useLocalStorageState} from './hooks/useLocalStorageState';

const App = () => {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const {movies, isLoading, error} = useMovies(query);
	const [watched, setWatched] = useLocalStorageState([], 'watched');

	const handleSelectMovie = (id) => {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	const handleCloseMovie = () => {
		setSelectedId(null);
	}

	const handleAddWatched = (movie) => {
		setWatched((watched) => [...watched, movie]);
	}

	const handleDeleteWatched = (id) => {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <Counter movies={movies} error={error} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
					{selectedId ? (
						<MovieDetails
						selectedId={selectedId}
						onCloseMovie={handleCloseMovie}
						onAddWatched={handleAddWatched}
						watched={watched}
					/>
						) : (
							<>
								<WatchedSummary watched={watched}/>
								<WatchedMovieList
									watched={watched}
									onDeleteWatched={handleDeleteWatched}
								/>
							</>
						)}
        </Box>
      </Main>
    </>
  );
};

export default App;

// import { useState } from "react";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// export default function App() {
//   const [query, setQuery] = useState("");
//   const [movies, setMovies] = useState(tempMovieData);
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen1, setIsOpen1] = useState(true);
//   const [isOpen2, setIsOpen2] = useState(true);

//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));

//   return (
//     <>
//       <nav className="nav-bar">
//         <div className="logo">
//           <span role="img">🍿</span>
//           <h1>usePopcorn</h1>
//         </div>
//         <input
//           className="search"
//           type="text"
//           placeholder="Search movies..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <p className="num-results">
//           Found <strong>{movies.length}</strong> results
//         </p>
//       </nav>

//       <main className="main">
//         <div className="box">
//           <button
//             className="btn-toggle"
//             onClick={() => setIsOpen1((open) => !open)}
//           >
//             {isOpen1 ? "–" : "+"}
//           </button>
//           {isOpen1 && (
//             <ul className="list">
//               {movies?.map((movie) => (
//                 <li key={movie.imdbID}>
//                   <img src={movie.Poster} alt={`${movie.Title} poster`} />
//                   <h3>{movie.Title}</h3>
//                   <div>
//                     <p>
//                       <span>🗓</span>
//                       <span>{movie.Year}</span>
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="box">
//           <button
//             className="btn-toggle"
//             onClick={() => setIsOpen2((open) => !open)}
//           >
//             {isOpen2 ? "–" : "+"}
//           </button>
//           {isOpen2 && (
//             <>
//               <div className="summary">
//                 <h2>Movies you watched</h2>
//                 <div>
//                   <p>
//                     <span>#️⃣</span>
//                     <span>{watched.length} movies</span>
//                   </p>
//                   <p>
//                     <span>⭐️</span>
//                     <span>{avgImdbRating}</span>
//                   </p>
//                   <p>
//                     <span>🌟</span>
//                     <span>{avgUserRating}</span>
//                   </p>
//                   <p>
//                     <span>⏳</span>
//                     <span>{avgRuntime} min</span>
//                   </p>
//                 </div>
//               </div>

//               <ul className="list">
//                 {watched.map((movie) => (
//                   <li key={movie.imdbID}>
//                     <img src={movie.Poster} alt={`${movie.Title} poster`} />
//                     <h3>{movie.Title}</h3>
//                     <div>
//                       <p>
//                         <span>⭐️</span>
//                         <span>{movie.imdbRating}</span>
//                       </p>
//                       <p>
//                         <span>🌟</span>
//                         <span>{movie.userRating}</span>
//                       </p>
//                       <p>
//                         <span>⏳</span>
//                         <span>{movie.runtime} min</span>
//                       </p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       </main>
//     </>
//   );
// }
