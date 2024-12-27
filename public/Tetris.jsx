import React from "react";
import AuthDetails from "../src/Components/Auth/AuthDetails";


function Tetris() {
  return (
    <div>
      <iframe
        src="../src/Tetris/index.html"
        title="Tetris"
        style={{ width: "100%", height: "100vh", border: "none" }}
      ></iframe>
    </div>
  );
}

export default Tetris;
