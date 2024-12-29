// Preloader.jsx
import React from "react";
import './PreLoader.css'

const Preloader = () => {
  return (
    <div style={styles.preloader} className="flex-col">
      <div style={styles.spinner} className="mb-4"></div>
      <p className="text-white font-def text-center text-xl">Loading..</p>
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
