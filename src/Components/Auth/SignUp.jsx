import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Если пользователь авторизован, перенаправляем на главную страницу
        navigate("/"); // Замените на нужный маршрут
      }
    });

    return () => unsubscribe(); // Отписываемся при размонтировании
  }, [auth, navigate]);

  function register(e) {
    e.preventDefault();
    if (copyPassword !== password) {
      setError("Passwords didn't match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setCopyPassword("");
        setPassword("");
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <form
        onSubmit={register}
        className="flex justify-center flex-col text-center items-center gap-[15px] pt-[200px]"
      >
        <h2 className="text-white font-def text-[32px]">Create an account</h2>
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
          Create
        </button>
        <Link to={{ pathname: "/signin" }} className="text-blue-500 font-def">
          Already have an account?
        </Link>
        <Link to={{ pathname: "/" }} className="text-white font-def">
          Back
        </Link>
        {error ? <p style={{ color: "red" }}>{error}</p> : ""}
      </form>
    </div>
  );
};

export default SignUp;
