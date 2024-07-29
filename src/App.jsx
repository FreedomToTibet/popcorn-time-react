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