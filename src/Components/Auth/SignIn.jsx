import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect, useContext } from "react";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LanguageContext } from "../LanguageContext";

import styles from "../HeaderInfo.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();

  const navigate = useNavigate();

  const { language, toggleLanguage } = useContext(LanguageContext); //

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  function logIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError("The Username or Password is incorrect. Try again");
      });
  }
  return (
    <div className={styles.container}>
      
      <div className="pt-2 absolute">
        <button
          onClick={() => toggleLanguage("en")}
          className={`px-4 py-2 mx-2 ${
            language === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md`}
        >
          English
        </button>
        <button
          onClick={() => toggleLanguage("ru")}
          className={`px-4 py-2 mx-2 ${
            language === "ru" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md`}
        >
          Русский
        </button>
      </div>
      <form className="flex justify-center flex-col text-center items-center gap-[15px] pt-[200px]">
        <h2 className="text-white font-def text-[32px] font-semibold">
          {language === 'en' ? "Sign in" : "Авторизация"}
        </h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-[280px] h-[40px] border-none rounded-md font-def text-sm pl-2 outline-none"
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-[280px] h-[40px] border-none rounded-md font-def pl-2 text-sm outline-none"
        />
        <button
          onClick={logIn}
          className="bg-blue-600 text-white w-[120px] h-[35px] rounded"
        >
          {language === 'en' ? "Login" : "Войти"}
        </button>
        <Link to={{ pathname: "/signup" }} className="text-blue-500 font-def">
          {language === "en" ? "Don't have an account?" : "Не зарегистрированы?"}
        </Link>
        <Link to={{ pathname: "/" }} className="text-white font-def">
          {language === 'en' ? "Back" : "Назад"}
        </Link>
        {error ? <p style={{ color: "red" }}>{error}</p> : ""}
      </form>
    </div>
  );
};

export default SignIn;
