import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface SolutionsDropdownProps {
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const SolutionsDropdown = ({
  isActive,
  onMouseEnter,
  onMouseLeave,
}: SolutionsDropdownProps) => {
  const { t } = useLanguage();

  return (
    <div 
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-primary dark:hover:text-primary-300 text-gray-700 dark:text-gray-200">
        {t("header.solutions")}
        <ChevronDown size={16} className="mt-0.5" />
      </button>
      {isActive && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700">
          <NavLink
            to="/health"
            className={({ isActive: isRouteActive }) => 
              `block px-4 py-2 transition-colors ${
                isRouteActive 
                  ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            {t("header.health")}
          </NavLink>
          <NavLink
            to="/nutritions"
            className={({ isActive: isRouteActive }) => 
              `block px-4 py-2 transition-colors ${
                isRouteActive 
                  ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            {t("header.nutrition")}
          </NavLink>
          <NavLink
            to="/solutions/education"
            className={({ isActive: isRouteActive }) => 
              `block px-4 py-2 transition-colors ${
                isRouteActive 
                  ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            {t("header.education")}
          </NavLink>
          <NavLink
            to="/solutions/public-sector"
            className={({ isActive: isRouteActive }) => 
              `block px-4 py-2 transition-colors ${
                isRouteActive 
                  ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            {t("header.public_sector")}
          </NavLink>
        </div>
      )}
    </div>
  );
};