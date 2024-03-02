import React from "react";

const BackButton = (props) => {
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
        onClick={props.goToPrevious}
      >
        Go Back
      </button>
    </section>
  );
};

export default BackButton;
