import React, { useContext, useState, useEffect, useCallback } from "react";
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
import menu from "../assets/menu.png";

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
      githubLink: "https://github.com/tedbundy12/tailwind-1",
    },
    {
      id: 2,
      title: "Website Layout of LaslesVPN",
      img: lasles,
      skills: "React JS / Tailwind",
      duration: "9 hours",
      category: "Layouts",
      link: "https://laselvpnn.vercel.app/",
      githubLink: "https://github.com/tedbundy12/thirdproject",
    },
    {
      id: 3,
      title: "Simple ToDo Planner",
      img: todo,
      skills: "React JS / Tailwind",
      duration: "2 hours",
      category: "Others",
      link: "https://todo-tailwind-livid.vercel.app/",
      githubLink: "https://github.com/tedbundy12/todoTailwind",
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
  const { language, toggleLanguage } = useContext(LanguageContext); //

  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories.en[0]);
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const auth = getAuth(); // Firebase Authentication
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Переключаем состояние между true и false
  };

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
      <div className="flex justify-end w-full pr-10 mb-4 pt-4 items-center ssm:justify-between ssm:px-4">
        {/* Отображаем AuthDetails, если пользователь в аккаунте */}
        {user ? (
          <AuthDetails />
        ) : (
          <div className="text-white font-def flex gap-[30px] mr-5 fm:mr-16">
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
          } rounded-md fm:hidden`}
        >
          English
        </button>
        <button
          onClick={() => toggleLanguage("ru")}
          className={`px-4 py-2 mx-2 ${
            language === "ru" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md fm:hidden`}
        >
          Русский
        </button>

        <div className="hidden fm:block" onClick={toggleVisibility}>
          <img src={menu} alt="" className="w-[30px] h-[30px]" />
        </div>
        <div
          className={`w-[100px] h-[110px] bg-opacity-20 absolute top-[40px] right-2 flex-col justify-center items-center flex rounded ${
            isVisible ? "block" : "hidden"
          }`}
        >
          <p
            onClick={() => toggleLanguage("en")}
            className={`text-center h-[30px] justify-center items-center flex w-full ${
              language === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded-md`}
          >
            English
          </p>
          <p
            onClick={() => toggleLanguage("ru")}
            className={`text-center mt-2 w-full h-[30px] justify-center items-center flex ${
              language === "ru" ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded-md`}
          >
            Русский
          </p>
        </div>
      </div>

      <p className="text-white text-[50px] text-center pt-20 font-def font-bold tracking-[4px]">
        {language === "en"
          ? "Vanik Sedrakyan's Portfolio"
          : "Портфолио Ваника Седракяна"}
      </p>

      <div className="text-white font-def font-semibold leading-[5px] pt-4 text-[18px] justify-center flex flex-col text-center items-center">
        <a
          href="https://www.linkedin.com/in/vanik-sedrakyan"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-90 transition-all leading-[20px]"
        >
          {language === "en"
            ? "Find me on LinkedIn"
            : "Найдите меня в LinkedIn"}
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
          className="mb-[10px] hover:opacity-90 transition-all"
        >
          {language === "en"
            ? "Message me on Telegram"
            : "Написать мне в Telegram"}
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
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="mb-[10px] hover:opacity-90 transition-all"
          onClick={() =>
            window.open(
              "https://discord.com/users/439749629295198248",
              "_blank"
            )
          }
        >
          {language === "en" ? "Discord" : "Discord"}
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

      <div className="mb-10 flex gap-5 justify-center pt-12 sm:flex-wrap">
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
      <div className="flex justify-center gap-[100px] flex-wrap fm:gap-[50px] sm:gap-[20px] tm:gap-[50px]">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            onClick={() =>
              window.open(project.link, "_blank", "noopener,noreferrer")
            }
            className={`group border-2 rounded-lg border-[#00000073] cursor-pointer`} // Добавляем cursor-pointer для индикации кликабельности
            initial={{ opacity: 0, y: 20 }} // Начальное состояние
            whileInView={{ opacity: 1, y: 0 }} // Конечное состояние
            exit={{ opacity: 0, y: -20 }} // Состояние при удалении
            transition={{ duration: 0.5 }} // Длительность анимации
            viewport={{ once: false }} // Анимация при повторном появлении
          >
            <div className="w-[380px] h-[250px] absolute flex justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300">
              <span className="text-white text-[20px] text-center font-bold">
                {openInNewTabText[language]}
              </span>
            </div>
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
              <p
                className="mb-2"
                onClick={() =>
                  window.open(
                    project.githubLink,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 256 256"
                  className="m-0 m-auto"
                >
                  <g
                    fill="#ffffff"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                  >
                    <g transform="scale(5.12,5.12)">
                      <path d="M17.791,46.836c0.711,-0.306 1.209,-1.013 1.209,-1.836v-5.4c0,-0.197 0.016,-0.402 0.041,-0.61c-0.014,0.004 -0.027,0.007 -0.041,0.01c0,0 -3,0 -3.6,0c-1.5,0 -2.8,-0.6 -3.4,-1.8c-0.7,-1.3 -1,-3.5 -2.8,-4.7c-0.3,-0.2 -0.1,-0.5 0.5,-0.5c0.6,0.1 1.9,0.9 2.7,2c0.9,1.1 1.8,2 3.4,2c2.487,0 3.82,-0.125 4.622,-0.555c0.934,-1.389 2.227,-2.445 3.578,-2.445v-0.025c-5.668,-0.182 -9.289,-2.066 -10.975,-4.975c-3.665,0.042 -6.856,0.405 -8.677,0.707c-0.058,-0.327 -0.108,-0.656 -0.151,-0.987c1.797,-0.296 4.843,-0.647 8.345,-0.714c-0.112,-0.276 -0.209,-0.559 -0.291,-0.849c-3.511,-0.178 -6.541,-0.039 -8.187,0.097c-0.02,-0.332 -0.047,-0.663 -0.051,-0.999c1.649,-0.135 4.597,-0.27 8.018,-0.111c-0.079,-0.5 -0.13,-1.011 -0.13,-1.543c0,-1.7 0.6,-3.5 1.7,-5c-0.5,-1.7 -1.2,-5.3 0.2,-6.6c2.7,0 4.6,1.3 5.5,2.1c1.699,-0.701 3.599,-1.101 5.699,-1.101c2.1,0 4,0.4 5.6,1.1c0.9,-0.8 2.8,-2.1 5.5,-2.1c1.5,1.4 0.7,5 0.2,6.6c1.1,1.5 1.7,3.2 1.6,5c0,0.484 -0.045,0.951 -0.11,1.409c3.499,-0.172 6.527,-0.034 8.204,0.102c-0.002,0.337 -0.033,0.666 -0.051,0.999c-1.671,-0.138 -4.775,-0.28 -8.359,-0.089c-0.089,0.336 -0.197,0.663 -0.325,0.98c3.546,0.046 6.665,0.389 8.548,0.689c-0.043,0.332 -0.093,0.661 -0.151,0.987c-1.912,-0.306 -5.171,-0.664 -8.879,-0.682c-1.665,2.878 -5.22,4.755 -10.777,4.974v0.031c2.6,0 5,3.9 5,6.6v5.4c0,0.823 0.498,1.53 1.209,1.836c9.161,-3.032 15.791,-11.672 15.791,-21.836c0,-12.682 -10.317,-23 -23,-23c-12.683,0 -23,10.318 -23,23c0,10.164 6.63,18.804 15.791,21.836z"></path>
                    </g>
                  </g>
                </svg>
              </p>
            </div>
          </motion.div>
        ))}

        <Comments></Comments>
      </div>
    </div>
  );
}

export default HeaderInfo;
