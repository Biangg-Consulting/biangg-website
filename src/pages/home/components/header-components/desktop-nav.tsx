import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { SolutionsDropdown } from "./solutions-dropdown";
import { ResourcesDropdown } from "./resources-dropdown";

export const DesktopNav = () => {
  const { t } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownHover = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="hidden md:flex items-center gap-6">
      <NavLink
        to="/"
        className={({ isActive }) => 
          `px-3 py-2 rounded-lg transition-colors ${
            isActive 
              ? "text-primary dark:text-primary-300 font-medium" 
              : "hover:text-primary dark:hover:text-primary-300 text-gray-700 dark:text-gray-200"
          }`
        }
      >
        {t("header.home")}
      </NavLink>

      <SolutionsDropdown 
        isActive={activeDropdown === "solutions"}
        onMouseEnter={() => handleDropdownHover("solutions")}
        onMouseLeave={handleDropdownLeave}
      />

      <ResourcesDropdown 
        isActive={activeDropdown === "resources"}
        onMouseEnter={() => handleDropdownHover("resources")}
        onMouseLeave={handleDropdownLeave}
      />

      <NavLink
        to="/projects"
        className={({ isActive }) => 
          `px-3 py-2 rounded-lg transition-colors ${
            isActive 
              ? "text-primary dark:text-primary-300 font-medium" 
              : "hover:text-primary dark:hover:text-primary-300 text-gray-700 dark:text-gray-200"
          }`
        }
      >
        {t("header.projects")}
      </NavLink>

      <NavLink
        to="/à-propos-de-nous"
        className={({ isActive }) => 
          `px-3 py-2 rounded-lg transition-colors ${
            isActive 
              ? "text-primary dark:text-primary-300 font-medium" 
              : "hover:text-primary dark:hover:text-primary-300 text-gray-700 dark:text-gray-200"
          }`
        }
      >
        {t("header.about")}
      </NavLink>
    </nav>
  );
};