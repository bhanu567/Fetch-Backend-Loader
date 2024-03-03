import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button
        style={{ padding: "0.5rem 2rem", cursor: "pointer" }}
        onClick={props.deleteButton}
      >
        Delete
      </button>
    </li>
  );
};

export default Movie;
