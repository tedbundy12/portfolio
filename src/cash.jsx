import { useContext, useState } from "react";
import { LanguageContext } from "./Components/LanguageContext";

export const categories = {
  en: ["All", "Layouts", "Games", "Others", "Top"],
  ru: ["Все", "Макеты", "Игры", "Другие", "Топ"],
};

export const openInNewTabText = {
  en: "Open in a new page",
  ru: "Открыть на новой странице",
};

export const Upper = () => {
  const { language } = useContext(LanguageContext);

  return (
    <button
      className="text-white text-[20px] fixed bottom-0 py-2 px-2"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      {language === "en" ? "Up" : "Вверх"}
    </button>
  );
};