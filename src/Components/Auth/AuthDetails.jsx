import React, { useContext } from "react";
import { auth } from "../Firebase"; // Импортируем аутентификацию Firebase
import { signOut } from "firebase/auth";
import { LanguageContext } from "../LanguageContext"; // Импортируем контекст языка
import CommentsSection from "./Comments"; // Импортируем новый компонент комментариев

const AuthDetails = () => {
  const { language } = useContext(LanguageContext);
  const user = auth.currentUser; // Получаем текущего пользователя

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Sign out error: ", error.message);
      });
  };

  return (
    <div className="auth-details mr-12 fm:mr-[180px]">
      {user ? (
        <div className="flex items-center">
          <p className="text-white mr-4">{language === "en" ? `You are logged in as ${user.email}` : `Вы вошли как ${user.email}`}</p>
          <button onClick={handleSignOut} className="bg-red-600 text-white px-4 py-2 rounded">
            {language === 'en' ? 'Logout' : "Выйти"}
          </button>
        </div>
      ) : (
        <p className="text-white">You are not logged in.</p>
      )}
    </div>
  );
};

export default AuthDetails;
