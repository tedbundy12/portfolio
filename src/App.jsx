import React from "react";
import HeaderInfo from "./Components/HeaderInfo";
import { LanguageProvider } from "./Components/LanguageContext";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";

import Supabase from './Supabase/components/App'
import ToDo from '../public/ToDo'
import Drone from '../public/Drone'
import Tetris from '../public/Tetris'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HeaderInfo />} />
          <Route path="/projects/1" element={<Supabase />} />
          <Route path="/projects/2" element={<ToDo />} />
          <Route path="/projects/3" element={<HeaderInfo />} />
          <Route path="/projects/4" element={<Drone />} />
          <Route path="/projects/5" element={<Tetris />} />
          {/* Страница для проекта 1 */}
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
