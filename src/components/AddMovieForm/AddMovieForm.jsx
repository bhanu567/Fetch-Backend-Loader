import React, { useRef } from "react";
import "./AddMovieForm.css";

const AddMovieForm = (props) => {
  const titleRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const newMovie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    props.addNewMovie(newMovie);
  };
  return (
    <div>
      <form
        onSubmit={submitHandler}
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          color: "white",
        }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef}></input>
        <label htmlFor="openingText">Opening Text</label>
        <textarea type="text" id="openingText" rows="5" ref={openingTextRef} />
        <label htmlFor="releaseDate">Release Date</label>
        <input type="date" id="releaseDate" ref={releaseDateRef} />
        <button
          style={{
            padding: "0.5rem 2rem",
            cursor: "pointer",
            width: "9rem",
            margin: "auto",
            marginTop: "1rem",
          }}
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovieForm;
