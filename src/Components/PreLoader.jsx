// Preloader.jsx
import React from "react";
import './PreLoader.css'

const Preloader = () => {
  return (
    <div style={styles.preloader}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  preloader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#111111",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #fff",
    borderTop: "5px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default Preloader;
