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
    <div className="auth-details mr-12 fm:mr-[50px] ffm:ml-[0px] em:mr-[30px] tm:mr-4 flex items-center">
      {user ? (
        <div className="flex items-center tm:flex-wrap">
          <p className="text-white mr-4 ssm:hidden">{language === "en" ? `${user.email}` : `Вы вошли как ${user.email}`}</p>
          <button onClick={handleSignOut} className="bg-red-600 tm:mt-2 text-white px-4 py-2 rounded ssm:ml-0">
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
