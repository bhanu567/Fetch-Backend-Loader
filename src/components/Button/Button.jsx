import React from "react";

const Button = (props) => {
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
        onClick={props.buttonFunction}
      >
        {props.title}
      </button>
    </section>
  );
};

export default Button;
