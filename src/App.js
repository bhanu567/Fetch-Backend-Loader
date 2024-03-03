import React, { useState, Fragment, useEffect } from "react";
import MovieList from "./components/Movie/MoviesList";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/loader";
import AddMovieForm from "./components/AddMovieForm/AddMovieForm";
import { useCallback } from "react";

function App() {
  let content = "";

  const [movies, setMovie] = useState([]);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [error, setError] = useState(null);
  const [displayForm, setDispalyForm] = useState(false);

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
      setDisplayLoader(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  function backButtonHandler() {
    setMovie([]);
  }

  function addNewMovieHandler(newMovie) {
    setMovie((prevMovies) => [...prevMovies, newMovie]);
    setDispalyForm(false);
  }

  function addMovieHandler() {
    setDispalyForm(true);
  }

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

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
    if (movies.length) {
      content = (
        <Fragment>
          {displayForm && (
            <AddMovieForm addNewMovie={addNewMovieHandler}></AddMovieForm>
          )}
          {!displayForm && (
            <Button
              title="Add Movies"
              buttonFunction={addMovieHandler}
            ></Button>
          )}
          <section>
            <MovieList movies={movies}></MovieList>
          </section>
          <Button title="Go Back" buttonFunction={backButtonHandler}></Button>
        </Fragment>
      );
    } else {
      content = (
        <Fragment>
          {displayForm && (
            <AddMovieForm addNewMovie={addNewMovieHandler}></AddMovieForm>
          )}
          {!displayForm && (
            <Button
              title="Add Movies"
              buttonFunction={addMovieHandler}
            ></Button>
          )}

          <Button
            title="Fetch Movies"
            buttonFunction={fetchMoviesHandler}
          ></Button>
        </Fragment>
      );
    }
  }

  return content;
}

export default App;
