import React from "react";
import { LanguageContext } from "./LanguageContext";

const CategoryButtons = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <div className="mb-10 flex gap-5 justify-center pt-12 sm:flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-lg border-2 border-black ${
            selectedCategory === category
              ? "bg-blue-600 text-[#fff]"
              : "bg-[#fff] text-black"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
