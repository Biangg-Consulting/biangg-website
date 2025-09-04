import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe size={20} className="text-gray-700 dark:text-gray-200" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg py-1 z-50 border border-gray-100 dark:border-gray-700">
          <button
            onClick={() => {
              changeLanguage("en");
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 flex items-center justify-between ${
              currentLanguage === "en"
                ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300"
                : "hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            English
            {currentLanguage === "en" && (
              <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-300"></span>
            )}
          </button>
          <button
            onClick={() => {
              changeLanguage("fr");
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 flex items-center justify-between ${
              currentLanguage === "fr"
                ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300"
                : "hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Français
            {currentLanguage === "fr" && (
              <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-300"></span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};