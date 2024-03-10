import React from "react";

function EmptyCart() {
  return (
    <div
      className="d-flex"
      style={{
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>
        <span style={{ color: "red" }}>Cart Is Empty!!</span>
      </h1>
      <br />
      <small>Puppy</small>
    </div>
  );
}

export default EmptyCart;

