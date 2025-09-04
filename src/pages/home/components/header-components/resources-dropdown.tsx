import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResourcesDropdownProps {
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const ResourcesDropdown = ({
  isActive,
  onMouseEnter,
  onMouseLeave,
}: ResourcesDropdownProps) => {
  const { t } = useLanguage();

  return (
    <div 
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-primary dark:hover:text-primary-300 text-gray-700 dark:text-gray-200">
        {t("header.resources")}
        <ChevronDown size={16} className="mt-0.5" />
      </button>
      {isActive && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700">
          <NavLink
            to="/resources/training"
            className={({ isActive: isRouteActive }) => 
              `block px-4 py-2 transition-colors ${
                isRouteActive 
                  ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            {t("header.training")}
          </NavLink>
          <NavLink
            to="/resources/research"
            className={({ isActive: isRouteActive }) => 
              `block px-4 py-2 transition-colors ${
                isRouteActive 
                  ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            {t("header.research_service")}
          </NavLink>
          <NavLink
            to="/resources/weight-loss"
            className={({ isActive: isRouteActive }) => 
              `block px-4 py-2 transition-colors ${
                isRouteActive 
                  ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            {t("header.weight_loss")}
          </NavLink>
          <NavLink
            to="/resources/media"
            className={({ isActive: isRouteActive }) => 
              `block px-4 py-2 transition-colors ${
                isRouteActive 
                  ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            {t("header.media")}
          </NavLink>
          <NavLink
            to="/resources/publications"
            className={({ isActive: isRouteActive }) => 
              `block px-4 py-2 transition-colors ${
                isRouteActive 
                  ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            {t("header.publications")}
          </NavLink>
          <NavLink
            to="/resources/how-we-work"
            className={({ isActive: isRouteActive }) => 
              `block px-4 py-2 transition-colors ${
                isRouteActive 
                  ? "bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-300" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            {t("header.how_we_work")}
          </NavLink>
        </div>
      )}
    </div>
  );
};