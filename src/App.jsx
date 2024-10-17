import React from "react";
import HeaderInfo from "./Components/HeaderInfo";
import { LanguageProvider } from "./Components/LanguageContext";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HeaderInfo />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
