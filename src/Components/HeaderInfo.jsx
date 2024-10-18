import React, { useContext, useState, useEffect } from "react";
import { LanguageContext } from "./LanguageContext"; // Импортируем контекст
import cv1 from "./cv1.pdf";
import supabase from "../assets/supabase.jpg";
import lasles from "../assets/lasles.jpg";
import todo from "../assets/todoo.webp";
import { Link, useNavigate } from "react-router-dom";
import AuthDetails from "./Auth/AuthDetails";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Импортируем Firebase Authentication
import Comments from "./Auth/Comments";
import { motion } from "framer-motion";

const projects = {
  en: [
    {
      id: 1,
      title: "Website Layout of Supabase",
      img: supabase,
      skills: "React JS / Tailwind",
      duration: "12 hours",
      category: "Layouts",
      link: "https://tailwind-1-j7qg.vercel.app/",
    },
    {
      id: 2,
      title: "Website Layout of LaslesVPN",
      img: lasles,
      skills: "React JS / Tailwind",
      duration: "9 hours",
      category: "Layouts",
      link: "https://laselvpnn.vercel.app/",
    },
    {
      id: 3,
      title: "Simple ToDo Planner",
      img: todo,
      skills: "React JS / Tailwind",
      duration: "2 hours",
      category: "Others",
      link: "https://todo-tailwind-livid.vercel.app/",
    },
    {
      id: 3,
      title: "Simple ToDo Planner",
      img: todo,
      skills: "React JS / Tailwind",
      duration: "2 hours",
      category: "Others",
      link: "https://todo-tailwind-livid.vercel.app/",
    },
    {
      id: 3,
      title: "Simple ToDo Planner",
      img: todo,
      skills: "React JS / Tailwind",
      duration: "2 hours",
      category: "Others",
      link: "https://todo-tailwind-livid.vercel.app/",
    },
    {
      id: 3,
      title: "Simple ToDo Planner",
      img: todo,
      skills: "React JS / Tailwind",
      duration: "2 hours",
      category: "Others",
      link: "https://todo-tailwind-livid.vercel.app/",
    },
  ],
  ru: [
    {
      id: 1,
      title: "Макет сайта Supabase",
      img: supabase,
      skills: "React JS / Tailwind",
      duration: "12 часов",
      category: "Макеты",
      link: "https://tailwind-1-j7qg.vercel.app/",
    },
    {
      id: 2,
      title: "Макет сайта LaslesVPN",
      img: lasles,
      skills: "React JS / Tailwind",
      duration: "9 часов",
      category: "Макеты",
      link: "https://laselvpnn.vercel.app/",
    },
    {
      id: 3,
      title: "Простой планировщик ToDo",
      img: todo,
      skills: "React JS / Tailwind",
      duration: "2 часа",
      category: "Другие",
      link: "https://todo-tailwind-livid.vercel.app/",
    },
  ],
};

const categories = {
  en: ["All", "Layouts", "Games", "Mobile", "Others", "Top"],
  ru: ["Все", "Макеты", "Игры", "Мобильные", "Другие", "Топ"],
};

const authLang = {
  en: ["Sign In", "Sign Up"],
  ru: ["Войти", "Зарегистрироваться"],
};

const openInNewTabText = {
  en: "Open in a new page",
  ru: "Открыть на новой странице",
};

function HeaderInfo() {
  const { language, toggleLanguage } = useContext(LanguageContext); // Получаем текущий язык и функцию для смены языка

  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories.en[0]);
  const [user, setUser] = useState(null); // Состояние для хранения пользователя

  const auth = getAuth(); // Инициализация Firebase Authentication
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Сбрасываем выбранную категорию на первую категорию текущего языка при смене языка
    setSelectedCategory(categories[language][0]);
  }, [language]);

  useEffect(() => {
    // Проверка состояния авторизации
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Устанавливаем пользователя
    });

    return () => unsubscribe(); // Отписываемся при размонтировании компонента
  }, [auth]);

  // Фильтрация проектов по выбранной категории
  const filteredProjects =
    selectedCategory === "All" || selectedCategory === "Все"
      ? projects[language]
      : projects[language].filter(
          (project) => project.category === selectedCategory
        );

  return (
    <div>
      <button
        className="text-white text-[20px] fixed bottom-0 py-2 px-2"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth", // для плавной прокрутки
          })
        }
      >
        {language === "en" ? "⬆" : "⬆"}
      </button>
      {/* Смена языка */}
      <div className="flex justify-end w-full pr-10 mb-4 pt-4 items-center">
        {/* Отображаем AuthDetails, если пользователь в аккаунте */}
        {user ? (
          <AuthDetails />
        ) : (
          <div className="text-white font-def flex gap-[30px] mr-5">
            <Link to={{ pathname: "/signin" }}>
              {language === "en" ? "Sign In" : "Войти"}
            </Link>
            <Link to={{ pathname: "/signup" }}>
              {language === "en" ? "Sign Up" : "3арегистрироваться"}
            </Link>
          </div>
        )}

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

      <p className="text-white text-[50px] text-center pt-20 font-def font-bold tracking-[4px]">
        {language === "en"
          ? "Vanik Sedrakyan's Portfolio"
          : "Портфолио Ваника Седракяна"}
      </p>

      <div className="text-white font-def font-semibold leading-[35px] text-[18px] flex flex-col text-center items-center">
        <a
          href="https://www.linkedin.com/in/vanik-sedrakyan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:opacity-90 transition-all"
        >
          {language === "en"
            ? "Find me on LinkedIn - www.linkedin.com/in/vanik-sedrakyan"
            : "Найдите меня в LinkedIn - www.linkedin.com/in/vanik-sedrakyan"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 48 48"
            className="ml-2"
          >
            {/* SVG иконка LinkedIn */}
          </svg>
        </a>

        <a
          href="https://t.me/sedrakyan8"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-[10px] flex items-center hover:opacity-90 transition-all"
        >
          {language === "en"
            ? "Message me on Telegram - @sedrakyan8"
            : "Напишите мне в Telegram - @sedrakyan8"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 48 48"
            className="ml-2"
          >
            {/* SVG иконка Telegram */}
          </svg>
        </a>

        <a href={cv1} download="cv1.pdf">
          <button className="w-[250px] h-[40px] bg-blue-600 rounded text-center hover:bg-blue-500 transition-all">
            {language === "en" ? "Download CV" : "Скачать резюме"}
          </button>
        </a>
      </div>

      <div className="mb-10 flex gap-5 justify-center pt-12">
        {categories[language].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg border-2 border-black ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Проекты */}
      <div className="flex justify-center gap-[100px] flex-wrap">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            onClick={() =>
              window.open(project.link, "_blank", "noopener,noreferrer")
            }
            className={`relative group border-2 rounded-lg border-[#00000073] transition-all duration-1000`}// Добавляем cursor-pointer для индикации кликабельности
            initial={{ opacity: 0, y: 20 }} // Начальное состояние
            whileInView={{ opacity: 1, y: 0 }} // Конечное состояние
            exit={{ opacity: 0, y: -20 }} // Состояние при удалении
            transition={{ duration: 0.5 }} // Длительность анимации
            viewport={{ once: false }} // Анимация при повторном появлении
          >
            <div className="font-def text-white text-center text-[18px]">
              <img
                src={project.img}
                alt={project.title}
                className="w-[380px] h-[250px] mb-5 rounded-lg"
              />
              <p className="mb-2">{project.title}</p>
              <p className="mb-2">
                {language === "en" ? "Skills" : "Навыки"} - {project.skills}
              </p>
              <p className="mb-2">
                {language === "en" ? "Duration" : "Длительность"} -{" "}
                {project.duration}
              </p>
              <div className="absolute h-[250px] mt-[0px] inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300">
                <span className="text-white text-[20px] font-bold">
                  {openInNewTabText[language]}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        <Comments></Comments>
      </div>
    </div>
  );
}

export default HeaderInfo;
