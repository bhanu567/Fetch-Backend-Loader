import React from "react";

const DisplayMovieButton = (props) => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0rem",
      }}
    >
      <button
        style={{ padding: "0.5rem 2rem", cursor: "pointer" }}
        onClick={props.fetchData}
      >
        Fetch Movies
      </button>
    </section>
  );
};

export default DisplayMovieButton;
