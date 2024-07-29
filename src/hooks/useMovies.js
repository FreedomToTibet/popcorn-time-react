import { useState, useEffect, useRef } from "react";

const KEY = "ed8c84e0";

export const useMovies = (query) => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const debounceTimeout = useRef(null);

	useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // fetchMovies();

			if (debounceTimeout.current) {
				clearTimeout(debounceTimeout.current);
			}
	
			debounceTimeout.current = setTimeout(() => {
				fetchMovies();
			}, 500);

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
};