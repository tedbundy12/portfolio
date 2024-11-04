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

import styles from "./HeaderInfo.module.css";

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
  ],
  ru: [
    {
      id: 1,
      title: "Вёрстка сайта Supabase",
      img: supabase,
      skills: "React JS / Tailwind",
      duration: "12 часов",
      category: "Вёрстка",
      link: "https://tailwind-1-j7qg.vercel.app/",
      githubLink: "https://github.com/tedbundy12/tailwind-1",
    },
    {
      id: 2,
      title: "Вёрстка сайта LaslesVPN",
      img: lasles,
      skills: "React JS / Tailwind",
      duration: "9 часов",
      category: "Вёрстка",
      link: "https://laselvpnn.vercel.app/",
      githubLink: "https://github.com/tedbundy12/thirdproject",
    },
    {
      id: 3,
      title: "Простой планировщик задач",
      img: todo,
      skills: "React JS / Tailwind",
      duration: "2 часа",
      category: "Другое",
      link: "https://todo-tailwind-livid.vercel.app/",
      githubLink: "https://github.com/tedbundy12/todoTailwind",
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
  const { language = "en", toggleLanguage } = useContext(LanguageContext);

  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories.en[0]);
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const auth = getAuth(); // Firebase Authentication
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Переключаем состояние между true и false
  };

  const filteredProjectsInp = projects[language].filter(
    (project) =>
      (selectedCategory === "All" ||
        selectedCategory === "Все" ||
        project.category === selectedCategory) &&
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  const filteredProjects = projects[language].filter((project) => {
    const isCategoryMatch =
      selectedCategory === "All" || 
      selectedCategory === "Все" || 
      project.category === selectedCategory;

    const isSearchMatch = project.title.toLowerCase().includes(searchQuery.toLowerCase());

    return isCategoryMatch && isSearchMatch;
  });
  return (
    <div className={styles.container}>
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

      <div className="text-white font-def font-semibold leading-[5px] pt-4 text-[18px] justify-center flex-col flex text-center items-center">
        <ul class={styles.example_2}>
          <li class={styles.icon_content}>
            <a
              href="https://linkedin.com/"
              aria-label="LinkedIn"
              data-social="linkedin"
            >
              <div class={styles.filled}></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-linkedin"
                viewBox="0 0 16 16"
                xmlSpace="preserve"
              >
                <path
                  d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
            <div class={styles.tooltip}>LinkedIn</div>
          </li>
          <li class={styles.icon_content}>
            <a
              href="https://www.github.com/"
              aria-label="GitHub"
              data-social="github"
            >
              <div class={styles.filled}></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-github"
                viewBox="0 0 16 16"
                xmlSpace="preserve"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
            <div className={styles.tooltip}>GitHub</div>
          </li>
        </ul>

        <a href={cv1} download="cv1.pdf" className="pt-4">
          <div class={styles.button} data-tooltip="74KB">
            <div class={styles.button_wrapper}>
              <div class={styles.text}>
                {language === "en" ? "Download CV" : "Скачать Резюме"}
              </div>
              <span class={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="2em"
                  height="2em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </a>
      </div>

      <div className="mb-6 flex gap-5 justify-center pt-12 sm:flex-wrap">
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

      <div className="flex justify-center pt-0 mb-4">
        <input
          type="text"
          placeholder={
            language === "en" ? "Search Projects by Name" : "Поиск проектов..."
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-lg w-[410px] h-[40px] pl-2 mb-4 border-none outline-none font-def elm:w-[350px] twm:w-[250px]"
        />
      </div>

      {/* Проекты */}
      <div className="flex justify-center gap-[100px] flex-wrap fm:gap-[50px] sm:gap-[20px] tm:gap-[50px] twm:w-full">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            onClick={() =>
              window.open(project.link, "_blank", "noopener,noreferrer")
            }
            className={`group border-2 rounded-lg bg-[#121212] border-[#00000073] cursor-pointer bg-opacity-80`} // Добавляем cursor-pointer для индикации кликабельности
            initial={{ opacity: 0, y: 20 }} // Начальное состояние
            whileInView={{ opacity: 1, y: 0 }} // Конечное состояние
            exit={{ opacity: 0, y: -20 }} // Состояние при удалении
            transition={{ duration: 0.5 }} // Длительность анимации
            viewport={{ once: false }} // Анимация при повторном появлении
          >
            <div className="w-[380px] h-[250px] absolute flex justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300 twm:w-full">
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
                {language === "en" ? "Skills" : "Навыки"} | {project.skills}
              </p>
              <p className="mb-2">
                {language === "en" ? "Duration" : "Длительность"} |{" "}
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
      </div>
      <div className="flex justify-center">
        <Comments></Comments>
      </div>
    </div>
  );
}

export default HeaderInfo;
