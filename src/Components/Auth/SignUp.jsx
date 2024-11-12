import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../Firebase"; // db — это Firestore instance, добавленный в Firebase config
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import styles from "../HeaderInfo.module.css";
import { LanguageContext } from "../LanguageContext";
import ParticlesComponent from "../Particles.jsx";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");
  const [recentUsers, setRecentUsers] = useState([]);

  const { language, toggleLanguage } = useContext(LanguageContext); //

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Перенаправление на главную страницу
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    // Функция для получения последних 5 зарегистрированных пользователей
    const fetchRecentUsers = async () => {
      try {
        const q = query(
          collection(db, "users"),
          orderBy("timestamp", "desc"),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => doc.data().email);
        setRecentUsers(users);
      } catch (err) {
        console.error("Ошибка при получении данных:", err);
      }
    };
    fetchRecentUsers();
  }, []);

  const register = (e) => {
    e.preventDefault();
    if (copyPassword !== password) {
      setError("Passwords didn't match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setError("");
        setEmail("");
        setCopyPassword("");
        setPassword("");

        // Сохранение данных пользователя в Firestore
        await addDoc(collection(db, "users"), {
          email: user.email,
          timestamp: new Date(),
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.particles}>
        <ParticlesComponent />
      </div>
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
      <form
        onSubmit={register}
        className="flex justify-center flex-col text-center items-center gap-[15px] pt-[200px]"
      >
        <h2 className="text-white font-def text-[32px] font-semibold">
          {language === "en" ? "Create an account" : "Создать Аккаунт"}
        </h2>
        <input
          placeholder="Please enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-[280px] h-[40px] border-none rounded-md font-def text-sm pl-2 outline-none"
        />
        <input
          placeholder="Please enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-[280px] h-[40px] border-none rounded-md font-def text-sm pl-2 outline-none"
        />
        <input
          placeholder="Please enter your password again"
          value={copyPassword}
          onChange={(e) => setCopyPassword(e.target.value)}
          type="password"
          className="w-[280px] h-[40px] border-none rounded-md font-def text-sm pl-2 outline-none"
        />
        <button className="bg-blue-600 text-white w-[120px] h-[35px] rounded">
          {language === "en" ? "Create" : "Создать"}
        </button>
        <Link to={{ pathname: "/signin" }} className="text-blue-500 font-def">
          {language === "en" ? "Already have an account?" : "Уже есть аккаунт?"}
        </Link>
        <Link to={{ pathname: "/" }} className="text-white font-def">
          {language === "en" ? "Back" : "Назад"}
        </Link>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div className="text-white mt-12 text-center">
        <h3 className="font-def text-[24px] font-semibold text-center mb-2">
          {language === "en" ? "Recent Registered Users" : "Недавние зарегистрированные Пользователи"}
        </h3>
        <ul className="flex items-center justify-center gap-4 flex-wrap">
          {recentUsers.map((user, index) => (
            <li key={index} className="font-def text-sm mb-2">
              | {user} |
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SignUp;
