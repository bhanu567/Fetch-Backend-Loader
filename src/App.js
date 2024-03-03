import React, { useState, Fragment, useEffect } from "react";
import MovieList from "./components/MoviesList";
import DisplayMovieButton from "./components/DisplayMovieButton";
import BackButton from "./components/BackButton";
import Loader from "./components/Loader/loader";
import { useCallback } from "react";

function App() {
  const [movies, setMovie] = useState([]);
  const [display, setDisplay] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [error, setError] = useState(null);

  // function fetchMoviesHandler() {
  //   fetch("https://swapi.dev/api/films")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedMoviesList = data.results.map((movieData) => ({
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date,
  //       }));
  //       setMovie(transformedMoviesList);
  //       setDisplay(true);
  //     });
  // }

  //Using Async Await
  const fetchMoviesHandler = useCallback(async function () {
    setDisplayLoader(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const JSONresponse = await response.json();
      const transformedMoviesList = JSONresponse.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));
      setMovie(transformedMoviesList);
      setDisplay(true);
      setDisplayLoader(false);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  function backButtonHandler() {
    setDisplay(false);
    setMovie([]);
  }
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  let content = "";
  if (displayLoader) {
    content = <Loader />;
  }
  if (error) {
    setTimeout(fetchMoviesHandler, 5000);
    content = (
      <Fragment>
        <h1
          style={{ textAlign: "center", color: "white", margin: "1rem 0rem" }}
        >
          {error}
        </h1>
        <Loader />
        <button
          style={{
            padding: "0.5rem 2rem",
            cursor: "pointer",
            marginLeft: "47%",
            marginTop: "10%",
          }}
          onClick={() => {
            setError(null);
            setDisplayLoader(false);
          }}
        >
          Cancel
        </button>
      </Fragment>
    );
  }
  if (!displayLoader) {
    content = (
      <Fragment>
        {!display && (
          <DisplayMovieButton
            fetchData={fetchMoviesHandler}
          ></DisplayMovieButton>
        )}
        <section>
          <MovieList movies={movies}></MovieList>
        </section>
        {display && <BackButton goToPrevious={backButtonHandler}></BackButton>}
      </Fragment>
    );
  }

  return content;
}

export default App;
