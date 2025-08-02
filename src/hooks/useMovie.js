import { useState, useEffect } from "react";

export function useMovie() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("movie not found");
          }

          setMovies(data.Search);
        } catch (err) {
          console.error("Fetch error:", err.message);
          setError("Movie not found");
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("movie not Found");
        return;
      }

      handleCloseMovie();

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
}
