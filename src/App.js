import React, { useState, Fragment } from "react";
import MovieList from "./components/MoviesList";
import DisplayMovieButton from "./components/DisplayMovieButton";
import BackButton from "./components/BackButton";
import Loader from "./components/Loader/loader";

function App() {
  const [movies, setMovie] = useState([]);
  const [display, setDisplay] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);

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
  async function fetchMoviesHandler() {
    setDisplayLoader(true);
    const response = await fetch("https://swapi.dev/api/films");
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
  }

  function backButtonHandler() {
    setDisplay(false);
    setMovie([]);
  }


    return (
      <Fragment>
        {!display && (
          <DisplayMovieButton
            fetchData={fetchMoviesHandler}
          ></DisplayMovieButton>
        )}
        <section>
        {displayLoader && <Loader></Loader>}
         {!displayLoader && <MovieList movies={movies}></MovieList>} 
        </section>
        {display && <BackButton goToPrevious={backButtonHandler}></BackButton>}
      </Fragment>
    );

}

export default App;
