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
      const response = await fetch(
        "https://react-http-8fc7a-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const JSONresponse = await response.json();

      let loadedMovies = [];
      for (let key in JSONresponse) {
        loadedMovies.push({
          id: key,
          title: JSONresponse[key].title,
          openingText: JSONresponse[key].openingText,
          releaseDate: JSONresponse[key].releaseDate,
        });
      }
      setMovie(loadedMovies);
      setDisplayLoader(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  function backButtonHandler() {
    setMovie([]);
  }

  async function addNewMovieHandler(newMovie) {
    const response = await fetch(
      "https://react-http-8fc7a-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setDispalyForm(false);
  }

  function addMovieHandler() {
    setDispalyForm(true);
  }

  async function deleteMovieHandler(e) {
    let title = e.target.parentElement.children[0].innerHTML;
    let id = "";
    for (let index = 0; index < movies.length; index++) {
      if (movies[index].title === title) {
        id = movies[index].id;
      }
    }
    console.log(id);
    await fetch(
      "https://react-http-8fc7a-default-rtdb.firebaseio.com/movies/"+id+".json",
      {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    fetchMoviesHandler();
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
            <MovieList
              movies={movies}
              deleteButton={deleteMovieHandler}
            ></MovieList>
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
